#include "readium_credential_handler.h"
#include <iostream>

ReadiumCredentialHandler::ReadiumCredentialHandler(lcp::ILcpService *service) {
  this->lcpService = service;
}

ReadiumCredentialHandler::~ReadiumCredentialHandler() {}

void ReadiumCredentialHandler::decrypt(lcp::ILicense *license) {
  // FIXME
  std::string passphrase = "edrlab";
  this->lcpService->DecryptLicense(license, passphrase);

  if (license->Decrypted()) {
    std::cout << "License decrypted";
  } else {
    std::cout << "Unable to decrypt license";
  }
}
