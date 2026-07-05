import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StripePaymentForm = ({ checkoutId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmitPayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return; // Stripe لم يحمل بعد
        }

        setIsProcessing(true);
        setErrorMessage(null);

        // 1. تأكيد عملية الدفع مباشرة من خلال Stripe
        // الـ PaymentElement بياخد بيانات الكارد بشكل آمن ومشفر تماماً بدون ما تلمس سيرفرك
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required', // يمنع الريدايركت التلقائي لو الدفع مش محتاج تفعيل 3D Secure
        });

        if (error) {
            setErrorMessage(error.message);
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                };

                // 2. الدفع نجح حقيقي! نكلم الباكيند بتاعنا (PUT /api/checkout/:id/pay)
                await axios.put(`http://localhost:9000/api/checkout/${checkoutId}/pay`, {
                    paymentStatus: "paid",
                    paymentDetails: paymentIntent
                }, config);

                // 3. نكلم الـ Finalize (POST /api/checkout/:id/finalize) عشان يكريت الـ Order ويمسح الكارت
                await axios.post(`http://localhost:9000/api/checkout/${checkoutId}/finalize`, {}, config);

                // 4. التوجه لصفحة نجاح الطلب
                navigate("/orderConfirmation");

            } catch (backendError) {
                console.error("Backend execution error:", backendError);
                setErrorMessage("Payment succeeded, but we faced an issue finalizing your order. Please contact support.");
                setIsProcessing(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmitPayment} className="mt-4 p-4 border rounded bg-gray-50">
            <h3 className='text-lg mb-4 font-bold'>Pay securely with Credit Card</h3>

            {/* دي الفورم الجاهزة والذكية من سترايب بتشمل رقم الكارد والتاريخ والـ CVC */}
            <div className="mb-4">
                <PaymentElement />
            </div>

            {errorMessage && (
                <div className="text-red-600 text-sm mb-4 font-semibold">
                    {errorMessage}
                </div>
            )}

            <button
                type="submit"
                disabled={isProcessing || !stripe || !elements}
                className='w-full py-2 bg-blue-600 text-white font-bold cursor-pointer rounded hover:bg-blue-700 transition disabled:bg-gray-400'
            >
                {isProcessing ? "Processing Payment..." : "Pay Now"}
            </button>
        </form>
    );
};

export default StripePaymentForm;