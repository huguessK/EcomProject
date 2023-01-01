import { useEffect, useState } from "react";
//import env from "react-dotenv";


import './paypal.css'
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";



const currency = "USD";
const style = {"layout":"vertical"};



// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner}) => {
    const [amount,setAmount]=useState("0")

                // This values are the props in the UI

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
        })

        async function getUsers() {
            try {
              const response = await fetch('https://ecomzuzuserver.onrender.com/api/price', {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                },
              });
      
             
      
              const result = await response.json();
      
              //alert('result is: ', result.price);
      
              setAmount(result.price);}catch (err) {
                //setErr(err.message);
                console.log("error-paypal",err.message);
              }
            } //end function
          
        
          getUsers();

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
    


const PaypalSetup=()=> {
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
/**end paypal */

export default PaypalSetup;


