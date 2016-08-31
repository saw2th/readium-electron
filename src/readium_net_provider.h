#ifndef readium_net_provider_h
#define readium_net_provider_h

#include "INetProvider.h"

class ReadiumNetProvider : public lcp::INetProvider {
public:
  ReadiumNetProvider();
  ~ReadiumNetProvider();
  void StartDownloadRequest(lcp::IDownloadRequest *request,
                            lcp::INetProviderCallback *callback);
  void CancelDownloadRequest(lcp::IDownloadRequest *request);
};

#endif
