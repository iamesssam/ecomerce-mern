

// import {
//     PayPalScriptProvider,
//     PayPalButtons
// } from "@paypal/react-paypal-js";

// const PayPalButton = ({ amount, onSuccess, onError }) => {
//     return (
//         <PayPalScriptProvider
//             options={{
//                 "client-id": "AS9tgvpofRObhYm22au5K4XHdpUUgPCoCBMpz_m8kUPgrMZB5M1czxAVhtUoU2-XagMMjCnmNNXegwzd",
//                 currency: "USD"
//             }}
//         >
//             <PayPalButtons
//                 createOrder={(data, actions) => {
//                     return actions.order.create({
//                         intent: "CAPTURE",
//                         purchase_units: [
//                             {
//                                 amount: {
//                                     currency_code: "USD",
//                                     value: amount.toString(),
//                                 },
//                             },
//                         ],
//                     });
//                 }}
//                 onApprove={(data, actions) => {
//                     return actions.order.capture().then(onSuccess);
//                 }}
//                 onError={onError}
//             />
//         </PayPalScriptProvider>
//     );
// };

// export default PayPalButton;

import {
    PayPalScriptProvider,
    PayPalButtons
} from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
    const handleFakePayment = () => {
        console.log("Simulating Success Payment...");
        // بنبعت بيانات وهمية تشبه اللي باي بال بيبعتها
        onSuccess({
            id: "FAKE-ID-" + Math.random().toString(36).substr(2, 9),
            status: "COMPLETED",
            payer: { name: { given_name: "Test User" } }
        });
    };

    return (
        <div className="flex flex-col gap-3">
            <PayPalScriptProvider options={{ "client-id": "test", currency: "USD" }}>
                <PayPalButtons
                    createOrder={(data, actions) => actions.order.create({ /* ... */ })}
                    onApprove={(data, actions) => actions.order.capture().then(onSuccess)}
                    onError={onError}
                />
            </PayPalScriptProvider>

            {/* زرار "سلكان" عشان تكمل مشروعك */}
            <button
                onClick={handleFakePayment}
                className="mt-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                (Dev Mode) Test Success Payment 🚀
            </button>
        </div>
    );
};

export default PayPalButton;
