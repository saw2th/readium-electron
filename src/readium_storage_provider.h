#ifndef readium_storage_provider_h
#define readium_storage_provider_h

#include "readium_dictionary.h"
#include "IStorageProvider.h"

class ReadiumStorageProvider : public lcp::IStorageProvider {
private:
  std::map<std::string, ReadiumDictionary> vaults;
public:
  ReadiumStorageProvider();
  ~ReadiumStorageProvider();
  std::string GetValue(const std::string &vaultId, const std::string &key);

  void SetValue(const std::string &vaultId, const std::string &key,
                const std::string &value);

  lcp::KvStringsIterator *EnumerateVault(const std::string &vaultId);
};

#endif
