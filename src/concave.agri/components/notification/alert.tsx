import React, { useEffect, useState } from 'react';
import { Alert as MantineAlert } from '@mantine/core';

interface AlertProps {
  variant?: string;
  color?: string;
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  [key: string]: any; // Allow rest props
}

const Alert = ({
  variant = 'light',
  color = 'blue',
  title,
  icon,
  children,
  onClose,
  ...rest
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Set visibility to false after 5 seconds
      if (onClose) {
        onClose(); // Call onClose callback after 5 seconds
      }
    }, 5000);

    return () => clearTimeout(timer); // Clear the timeout when component unmounts
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false); // Close the alert manually
    if (onClose) {
      onClose(); // Call onClose callback when alert is closed manually
    }
  };

  return (
    <>
      {isVisible && ( // Render the alert only if it's visible
        <MantineAlert
          variant={variant}
          color={color}
          title={title}
          icon={icon}
          onClose={handleClose} // Call handleClose when close button is clicked
          {...rest} // Spread rest props
        >
          {children}
        </MantineAlert>
      )}
    </>
  );
};

export default Alert;
