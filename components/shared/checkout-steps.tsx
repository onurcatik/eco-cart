import React from 'react';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faCreditCard, faLock,  } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
// import { faFirstOrderAlt } from '@fortawesome/free-brands-svg-icons';

const CheckoutSteps = ({ current = 0 }) => {
  return (
    <div className="flex-between flex-col md:flex-row space-x-2 space-y-2 mb-10">
      {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step, index) => (
          <React.Fragment key={step}>
            <div
              className={cn(
                'p-2 w-56 rounded-full text-center text-sm flex items-center justify-center',
                index === current ? 'bg-secondary' : ''
              )}
            >
              {/* Add icons based on step */}
              {step === 'User Login' && (
                <FontAwesomeIcon icon={faUser} className="mr-2 w-7" />
              )}
              {step === 'Shipping Address' && (
                <FontAwesomeIcon  icon={faAddressBook} className="mr-2 w-8" />
              )}
              {step === 'Payment Method' && (
                <FontAwesomeIcon icon={faCreditCard} className="mr-2 w-8" />
              )}
              {step === 'Place Order' && (
                <FontAwesomeIcon icon={faLock} className="mr-2 w-7" />
              )}
              {step}
            </div>
          </React.Fragment>
        )
      )}
    </div>
  );
};

export default CheckoutSteps;
