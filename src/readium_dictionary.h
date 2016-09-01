#ifndef readium_dictionary_h
#define readium_dictionary_h

#include <vector>
#include <map>
#include <string>
#include "IValueIterator.h"

/**
 * Ordered dictionary
 */
class ReadiumDictionary : public lcp::KvStringsIterator
{
private:
  std::map<std::string, std::string> keyValueMapping;
  std::map<std::string, int> keyIndexMapping;
  std::vector<std::string> keys;
  int currentIndex;
public:
  ReadiumDictionary();
  ~ReadiumDictionary();
  void First();
  void Next();
  bool IsDone() const;
  int Size() const;
  void Set(const std::string &key, const std::string &value);
  void Del(const std::string &key);
  const std::string & Get(const std::string &key) const;
  const std::string & Current() const;
  std::string CurrentKey() const;
};

#endif
