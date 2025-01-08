# How to setup the simple inventory

# 1. Find a computer

It should be a computer that is on the network but has a static IP.

> **What is a static IP?**: It is an IP address that never changes. Make sure that this computer has one or else DHCP will change it's IP every so often. This will make it annoying to use because you will have to go to a different IP in your web browser to use the system every so often.

The computer should also be _always_ online with the program running. If the program is not running, then you cannot access the website.

# 2. Download the program

On the computer that you found, you should download the simple inventory program itself.

Choose which one applies to you:

| OS      | Architecture |                                                                                                                           |
| ------- | ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Windows | x64          | [Download](https://github.com/AideTechBot/simple-inventory/raw/refs/heads/main/release/simple-inventory-windows.exe.zip)  |
| MacOS   | x64          | [Download](https://github.com/AideTechBot/simple-inventory/raw/refs/heads/main/release/simple-inventory-mac-intel.zip)    |
| MacOS   | ARM64        | [Download](https://github.com/AideTechBot/simple-inventory/raw/refs/heads/main/release/simple-inventory-mac.zip)          |
| Linux   | x64          | [Download](https://github.com/AideTechBot/simple-inventory/raw/refs/heads/main/release/simple-inventory-linux.zip)        |
| Linux   | ARM64        | [Download](https://github.com/AideTechBot/simple-inventory/raw/refs/heads/main/release/simple-inventory-linux-mobile.zip) |

After it's done downloading, choose a folder on your harddrive to unzip it to.

[Download this database file](https://github.com/AideTechBot/simple-inventory/raw/refs/heads/main/inventory_database.db) and copy it to the folder you just created.

> If you are on linux, you should run the command: `chmod +x simple-inventory-linux`

# 3. Run it

> **Before you run it**: Make sure that there is no other web servers running on port 80 on the machine, it will fail to start if there is.

This step is extremely simple, all you got to do is run the file you downloaded from a command line or terminal:

```bash
./simple-inventory-version
```

For example, on linux:

```bash
./simple-inventory-linux
```

# 4. Access it

If you want to try it on the computer the server is on, go to http://localhost in a web browser.

If you want to access it elsewhere on the network, go to http://theipofthecompuer (e.g. http://192.168.2.23)

# Troubleshooting

If you run into the scanner not showing the camera view of your device, this happens because the connection to the server is using an unencrypted web connection. This is normal for internal network stuff. You need to change a security setting on your device to allow access to the camera on specific unencrypted local websites. Follow these instructions to fix:

> This only works on chrome as far as I know so if you use mobile safari, I have no clue what to do here yet.

1. Open up Chrome on the device and go to `chrome://flags` in the search bar.
2. Search for the setting called **"Insecure origins treated as secure"**
3. Enable the setting.
4. In the search field, paste the url to your server. (e.g. http://192.168.2.21)
5. Save the settings and restart chrome (by terminating the program on the device, this is different by device)

After these steps, you should be able to use the scanner in the inventory system.
