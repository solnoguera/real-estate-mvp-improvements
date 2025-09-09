import { ethers } from "ethers";

// Multiples RPCs for BSC Testnet (fallbacks)
export const BSC_TESTNET_RPCS = [
  "https://data-seed-prebsc-1-s1.binance.org:8545/",
  "https://data-seed-prebsc-2-s1.binance.org:8545/",
  "https://data-seed-prebsc-1-s2.binance.org:8545/",
  "https://data-seed-prebsc-2-s2.binance.org:8545/",
  "https://data-seed-prebsc-1-s3.binance.org:8545/",
  "https://bsc-testnet.public.blastapi.io",
  "https://bsc-testnet-rpc.publicnode.com"
];
// Multiples RPCs for BSC Mainnet (fallbacks)
export const BSC_MAINNET_RPCS = [
  "https://bsc-dataseed.binance.org/",
  "https://bsc-dataseed1.defibit.io/",
  "https://bsc-dataseed1.ninicoin.io/",
  "https://bsc-dataseed2.defibit.io/",
  "https://bsc-dataseed3.defibit.io/",
  "https://bsc-dataseed4.defibit.io/"
];

export const TEST_NETWORK_CONFIG = {
  chain_id: "0x61",
  error_msg: "Please select Binance Testnet",
  rpcs: BSC_TESTNET_RPCS
};

export const MAIN_NETWORK_CONFIG = {
  chain_id: "0x38",
  error_msg: "Please select Binance Mainnet",
  rpcs: BSC_MAINNET_RPCS
};

export const NETWORK_CONFIG =
  process.env.NODE_ENV === "production" ? MAIN_NETWORK_CONFIG : TEST_NETWORK_CONFIG;

export const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"; // USDT in BSC Mainnet
export const USDT_TESTNET = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd"; // USDT in BSC Testnet
export const USDT_ABI = [
  "function balanceOf(address owner) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function decimals() external view returns (uint8)",
  "function transfer(address to, uint256 amount) external returns (bool)"
];

export const approveNetwork = async () => {
  return new Promise(async (resolve) => {
    const chainId = NETWORK_CONFIG.chain_id;
    const networks = {
      "0x61": {
        chainName: "Binance Test Network",
        rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
        blockExplorerUrls: ["https://testnet.bscscan.com/"],
      },
      "0x38": {
        chainName: "Binance Mainnet",
        rpcUrls: ["https://bsc-dataseed.binance.org/"],
        blockExplorerUrls: ["https://bscscan.com/"],
      },
    };

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
      return resolve(true);
    } catch (error) {
      if (error.code === 4902 && networks[chainId]) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId,
                ...networks[chainId],
                iconUrls: ["https://www.logo.wine/a/logo/Binance/Binance-Icon-Logo.wine.svg"],
                nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
              },
            ],
          });
          return resolve(true);
        } catch (addError) {
          console.error(addError);
        }
      }
    }
    resolve(false);
  });
};

// Function to create provider with automatic fallback
// Uses multiple BSC RPCs for greater reliability
// IMPORTANT: Only for READ operations (balances, contract info, etc.)
// For TRANSACTIONS always use MetaMask provider with signer
const createRobustProvider = async () => {
  const isMainnet = process.env.NODE_ENV === "production";
  const rpcUrls = isMainnet ? BSC_MAINNET_RPCS : BSC_TESTNET_RPCS;
  
  for (let i = 0; i < rpcUrls.length; i++) {
    try {
      const provider = new ethers.JsonRpcProvider(rpcUrls[i]);
      // Test the connection
      await provider.getBlockNumber();
      console.log(`✅ Provider robusto connected to RPC ${i + 1}/${rpcUrls.length}:`, rpcUrls[i]);
      return provider;
    } catch (error) {
      console.warn(`❌ RPC ${i + 1}/${rpcUrls.length} failed:`, rpcUrls[i], error.message);
      if (i === rpcUrls.length - 1) {
        throw new Error("All RPC providers are failing. Try again later.");
      }
    }
  }
}

export const getUSDTContract = async () => {
  const provider = await createRobustProvider();
  const network = await provider.getNetwork();
  
  // Select USDT address according to the network (56 for Mainnet, 97 for Testnet)
  const usdtAddress = Number(network.chainId) === 56 ? USDT_ADDRESS : USDT_TESTNET;
  
  return new ethers.Contract(usdtAddress, USDT_ABI, provider);
}

// Function to get USDT balance of the user
export const getUSDTBalance = async (userAddress) => {
  try {
    const usdt = await getUSDTContract();
    const balance = await usdt.balanceOf(userAddress);
    const decimals = await usdt.decimals();
    
    return ethers.formatUnits(balance, decimals);
  } catch (error) {
    console.error("Error getting USDT balance:", error);
    throw error;
  }
}

// Function to get BNB balance of the user
export const getBNBBalance = async (userAddress) => {
  try {
    const provider = await createRobustProvider();
    const balance = await provider.getBalance(userAddress);
    
    return ethers.formatEther(balance);
  } catch (error) {
    console.error("Error getting BNB balance:", error);
    throw error;
  }
}

export const handleConnectWallet = async () => {
  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask");
    return;
  }

  try {
    await approveNetwork();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const account = accounts[0];
    console.log("account", account);
    const balance = await getBNBBalance(account);
    const balanceUSDT = await getUSDTBalance(account);
    console.log("Connected to MetaMask:", account);
    console.log("Balance BNB:", balance);
    console.log("Balance USDT:", balanceUSDT);
    alert(`Connected to MetaMask: ${account}. Balance BNB: ${balance}. Balance USDT: ${balanceUSDT}`);
    // save to local storage
    localStorage.setItem("userAddress", account);
    localStorage.setItem("balanceBNB", balance);
    localStorage.setItem("balanceUSDT", balanceUSDT);
    window.location.reload();
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
    const errorMessage =
      error.code === -32002
        ? "Processing connection with the wallet, open Metamask."
        : error.code === 4001
        ? "Connection with Metamask rejected"
        : error.message;
      alert(
        `Error MetaMask: \n${errorMessage}`
      );
  }
}

export const handleDisconnectWallet = async () => {
  localStorage.removeItem("userAddress");
  localStorage.removeItem("balanceBNB");
  localStorage.removeItem("balanceUSDT");
  alert("Disconnected from MetaMask");
  window.location.reload();
}