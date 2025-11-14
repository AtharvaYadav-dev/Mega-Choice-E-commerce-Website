import React from "react";
import {
  FaShoppingBag,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCheck,
} from "react-icons/fa";

const CartSteps = ({ currentStep }) => {
  const steps = [
    {
      id: 1,
      title: "BAG",
      icon: FaShoppingBag,
      description: "Review your items",
    },
    {
      id: 2,
      title: "ADDRESS",
      icon: FaMapMarkerAlt,
      description: "Delivery address",
    },
    {
      id: 3,
      title: "PAYMENT",
      icon: FaCreditCard,
      description: "Payment method",
    },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200">
              <div
                className="h-full bg-rose-600 transition-all duration-500"
                style={{
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                }}
              ></div>
            </div>

            {steps.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center relative z-10"
                >
                  {/* Step Circle */}
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-300
                      ${
                        isCompleted
                          ? "bg-rose-600 text-white"
                          : isActive
                            ? "bg-rose-600 text-white shadow-lg scale-110"
                            : "bg-gray-200 text-gray-500"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <FaCheck className="text-sm" />
                    ) : (
                      <step.icon className="text-sm" />
                    )}
                  </div>

                  {/* Step Info */}
                  <div className="mt-3 text-center">
                    <div
                      className={`
                        text-sm font-semibold transition-colors duration-300
                        ${
                          isActive || isCompleted
                            ? "text-rose-600"
                            : "text-gray-500"
                        }
                      `}
                    >
                      {step.title}
                    </div>
                    <div
                      className={`
                        text-xs mt-1 transition-colors duration-300
                        ${isActive ? "text-gray-700" : "text-gray-500"}
                      `}
                    >
                      {step.description}
                    </div>
                  </div>

                  {/* Active Step Indicator */}
                  {isActive && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-2 h-2 bg-rose-600 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSteps;
