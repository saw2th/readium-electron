#include "readium_storage_provider.h"
#include <sstream>
#include <iostream>

ReadiumStorageProvider::ReadiumStorageProvider() {
}

ReadiumStorageProvider::~ReadiumStorageProvider() {}

std::string ReadiumStorageProvider::GetValue(const std::string &vaultId,
                                             const std::string &key) {
  try {
    this->vaults.at(vaultId).Get(key);
  } catch (const std::out_of_range &e) {
    // Key does not exist
    return "";
  }
}

void ReadiumStorageProvider::SetValue(const std::string &vaultId,
                                      const std::string &key,
                                      const std::string &value) {
  // Get vault if it exists
  // otherwise create it
  try {
    this->vaults.at(vaultId).Set(key, value);
  } catch (const std::out_of_range &e) {
    // Vault does not exist
    this->vaults.insert(
      std::make_pair(vaultId, ReadiumDictionary()));
    this->vaults.at(vaultId).Set(key, value);
  }
}

lcp::KvStringsIterator *
ReadiumStorageProvider::EnumerateVault(const std::string &vaultId) {
  try {
    return &this->vaults.at(vaultId);
  } catch (const std::out_of_range &e) {
    // Vault does not exist
    return new ReadiumDictionary();
  }
}
