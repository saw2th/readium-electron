#ifndef readium_credential_handler_h
#define readium_credential_handler_h

#include "LcpContentModule.h"
#include "ILcpService.h"

class ReadiumCredentialHandler : public lcp::ICredentialHandler {
private:
  lcp::ILcpService *lcpService;

public:
  ReadiumCredentialHandler(lcp::ILcpService *service);
  ~ReadiumCredentialHandler();
  void decrypt(lcp::ILicense *license);
};

#endif
