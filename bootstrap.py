#!/usr/bin/python
import os
import shutil
import platform
import utils
import urllib
import zipfile
import tempfile
import subprocess

# Other variables
SYSTEM = platform.system().lower()

if SYSTEM == "darwin":
    SYSTEM = "mac"

# Install gyp
def install_gyp():
    if os.path.exists(os.path.join("vendor", "gyp")):
        return

    print "Clone gyp"
    utils.execute_command(["git", "clone", "https://chromium.googlesource.com/external/gyp.git", "vendor/gyp"])

# Install ninja
def install_ninja():
    if not os.path.exists(os.path.join("vendor", "ninja")):
        print "Clone ninja"
        utils.execute_command(["git", "clone", "https://github.com/ninja-build/ninja.git", "vendor/ninja"])

    # Configure and build ninja
    if SYSTEM == "windows":
        cmd_path = (os.path.join("vendor", "ninja", "ninja.exe"))
    else:
        cmd_path = (os.path.join("vendor", "ninja", "ninja"))

    if not os.path.exists(cmd_path):
        print "Build and install ninja"

        # Initialize visual studio environment variables
        cmd = ["python", "configure.py", "--bootstrap"]

        if SYSTEM == "windows":
            cmd = ["vcvarsall.bat", "&&"] + cmd

        utils.execute_command(cmd, os.path.join("vendor", "ninja"))

# Install gyp
def install_gyp():
    if os.path.exists(os.path.join("vendor", "gyp")):
        return

    print "Clone gyp"
    utils.execute_command(["git", "clone", "https://chromium.googlesource.com/external/gyp.git", "vendor/gyp"])


# Install nacl sdk
def install_nacl_sdk():
    nacl_sdk_path = os.path.join("vendor", "nacl_sdk")

    if not os.path.exists(nacl_sdk_path):
        print "Download nacl sdk"
        nacl_sdk_zip_path = os.path.join("vendor", "nacl_sdk.zip")
        urllib.urlretrieve(
            "https://storage.googleapis.com/nativeclient-mirror/nacl/nacl_sdk/nacl_sdk.zip",
            nacl_sdk_zip_path)

        print "Extract nacl sdk"
        with zipfile.ZipFile(nacl_sdk_zip_path, "r") as nacl_sdk_zip:
            tmp_nacl_sdk_path = tempfile.mkdtemp(prefix="nacl", dir="vendor")
    	    nacl_sdk_zip.extractall(tmp_nacl_sdk_path)
            shutil.move(
                os.path.join(tmp_nacl_sdk_path, "nacl_sdk"),
                nacl_sdk_path)
            os.rmdir(tmp_nacl_sdk_path)

        os.remove(nacl_sdk_zip_path)

    if not os.path.exists(os.path.join(nacl_sdk_path, "pepper_49")):
        print "Install nacl_sdk"

        if SYSTEM == "windows":
            # Use absolute path to execute bat script
            utils.execute_command([
                    os.path.abspath(os.path.join(nacl_sdk_path, "naclsdk.bat")),
                     "install", "pepper_49"
                ],
                nacl_sdk_path)
        else:
            os.chmod(os.path.join(nacl_sdk_path, "naclsdk"), 0755)
            utils.execute_command(["./naclsdk", "install", "pepper_49"], nacl_sdk_path)

# Install readium sdk
def install_readium_sdk():
    readium_sdk_path = os.path.join("vendor", "readium-sdk");

    if not os.path.exists(readium_sdk_path):
        print "Clone readium-sdk"
        utils.execute_command([
            "git", "clone", "-b", "feature/ppapi",
            "https://github.com/clebeaupin/readium-sdk.git",
            "vendor/readium-sdk"
        ])

    readium_sdk_platform_path = os.path.join(readium_sdk_path, "Platform", "cross-platform")

    if not os.path.exists(os.path.join(readium_sdk_platform_path, "vendor")):
        print "Bootstrap readium-sdk"
        utils.execute_command(
            ["python", "bootstrap.py"],
            readium_sdk_platform_path
        )

def install_readium_lcp_client():
    if os.path.exists(os.path.join("vendor", "readium-lcp-client")):
        return

    print "Clone readium-lcp-client"
    utils.execute_command(["git", "clone", "-b", "feature/cross-platform", "https://github.com/clebeaupin/readium-lcp-client.git", "vendor/readium-lcp-client"])

# Download and install vendors
if not os.path.exists("vendor"):
    os.mkdir("vendor")

install_gyp()
install_ninja()
install_nacl_sdk()
install_readium_sdk()
install_readium_lcp_client()
