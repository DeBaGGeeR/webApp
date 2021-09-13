import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
 
export default class MyApp extends React.Component {
    render() {
        const onSuccess = (payment) => {
          		console.log("The payment was succeeded!", payment);
            		this.props.transSuccess(payment)
       }
 
        const onCancel = (data) => {
          console.log('The payment was cancelled!', data);
        }
 
        const onError = (err) => {
     
            console.log("Error!", err);
           
        }
 
        let env = 'sandbox'; 
        let currency = 'USD'; 
        let total = this.props.total; 

        const client = {
            sandbox:    'AWBNLzyYo83UpjpFNgGV3pcaHndfW20fEw6e2By1YSlfxkEyz8jlPIxFXTS2Wb1tRTPZEJudUHrSys9h',
            production: 'PRODUCTION-APP-ID',
        }

        let style={
            size: 'small',
            color: 'blue',
            shape: 'rect',
            label: 'checkout',
            tagline: false
        }
        return (
            <PaypalExpressBtn 
                style={style} 
                env={env} 
                client={client} 
                currency={currency} 
                total={total} 
                onError={onError} 
                onSuccess={onSuccess} 
                onCancel={onCancel} />
        );
  
    }
}