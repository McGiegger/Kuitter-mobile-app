import React, { createContext, useContext, useState, useCallback } from 'react';

type Partner = {
  id: string;
  name: string;
  avatar?: string;
  isAnonymous: boolean;
  streak: number;
};

type PartnershipContextType = {
  showRequest: (partner: Partner) => void;
  hideRequest: () => void;
  currentRequest: Partner | null;
  isRequestVisible: boolean;
  acceptRequest: () => void;
  declineRequest: () => void;
};

const PartnershipContext = createContext<PartnershipContextType | undefined>(undefined);

export function PartnershipProvider({ children }: { children: React.ReactNode }) {
  const [currentRequest, setCurrentRequest] = useState<Partner | null>(null);
  const [isRequestVisible, setIsRequestVisible] = useState(false);

  const showRequest = useCallback((partner: Partner) => {
    setCurrentRequest(partner);
    setIsRequestVisible(true);
  }, []);

  const hideRequest = useCallback(() => {
    setIsRequestVisible(false);
    setCurrentRequest(null);
  }, []);

  const acceptRequest = useCallback(() => {
    // Here you would typically make an API call to accept the request
    hideRequest();
  }, [hideRequest]);

  const declineRequest = useCallback(() => {
    // Here you would typically make an API call to decline the request
    hideRequest();
  }, [hideRequest]);

  return (
    <PartnershipContext.Provider
      value={{
        showRequest,
        hideRequest,
        currentRequest,
        isRequestVisible,
        acceptRequest,
        declineRequest,
      }}
    >
      {children}
    </PartnershipContext.Provider>
  );
}

export function usePartnership() {
  const context = useContext(PartnershipContext);
  if (context === undefined) {
    throw new Error('usePartnership must be used within a PartnershipProvider');
  }
  return context;
}