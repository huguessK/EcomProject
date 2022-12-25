import { useEffect } from "react";
//import env from "react-dotenv";

import './paypal.css'
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";



// This values are the props in the UI

let amount ;

fetch("/api/cart-item-quantity").then(
    response=> response.json()
    ).then(
    data => {
      amount=data["item"];
      }
    )



const currency = "USD";
const style = {"layout":"vertical"};

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }) => {
    
    
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <div className="pay">

            <div className="paybutton">
            <PayPalButtons 
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function () {
                        // Your code here after capture the order
                    });
                }}
            />
            </div>
             </div>
        </>
    );
}

export default function PaypalSetup() {
    //const id="test";
    const id="test"; //it's a demo site, no key needed
	return (
        <>
		<div className="paypalsetup">
            <PayPalScriptProvider
                options={{
                    "client-id": id, 
                    components: "buttons",
                    currency: "USD"
                }}
            >
				<ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                />
			</PayPalScriptProvider>
		</div>
        </>
	);
}