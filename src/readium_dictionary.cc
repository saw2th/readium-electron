#include "readium_dictionary.h"
#include <sstream>
#include <iostream>

ReadiumDictionary::ReadiumDictionary() { this->currentIndex = 0; }

ReadiumDictionary::~ReadiumDictionary() {}

void ReadiumDictionary::First() { this->currentIndex = 0; }

void ReadiumDictionary::Next() { this->currentIndex++; }

bool ReadiumDictionary::IsDone() const {
  return this->currentIndex >= this->keys.size();
}

const std::string &ReadiumDictionary::Current() const {
  if (this->IsDone()) {
    throw std::out_of_range("Iterator is out of range");
  }

  return this->keyValueMapping[this->keys[this->currentIndex]];
}

std::string ReadiumDictionary::CurrentKey() const {
  if (this->IsDone()) {
    throw std::out_of_range("Iterator is out of range");
  }

  return this->keys[currentIndex];
}

uint ReadiumDictionary::Size() const {
  return this->keys.size();
}

void ReadiumDictionary::Set(const std::string &key, const std::string &value) {
  uint keyIndex = this->keys.size();
  this->keys.push_back(key);
  this->keyIndexMapping.insert(std::pair<std::string, uint>(key, keyIndex));
  this->keyValueMapping.insert(std::pair<std::string, std::string>(key, value));
}

void ReadiumDictionary::Del(const std::string &key) {
  uint keyIndex = this->keyIndexMapping.at(key);
  this->keys.erase(this->keys.begin() + keyIndex);
  this->keyValueMapping.erase(key);
  this->keyIndexMapping.erase(key);
}

const std::string & ReadiumDictionary::Get(const std::string & key) const {
  return this->keyValueMapping.at(key);
}
