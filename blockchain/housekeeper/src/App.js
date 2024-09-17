import { useEffect, useState } from 'react';
import * as ethers from 'ethers';

// Components
import Navigation from './components/Navigation';
import Search from './components/Search';
import Home from './components/Home';

// ABIs
import RealEstate from './abis/RealEstate.json'
import Escrow from './abis/Escrow.json'

// Config
import config from './config.json';

import { FaSun, FaMoon } from 'react-icons/fa'; // Import icons for day/night toggle

function App() {

  const [currentAccount, setCurrentAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [escrow, setEscrow] = useState(null)
  const [homes, setHomes] = useState([])
  const [home, setHome] = useState({})
  const [toggle, setToggle] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  let totalSupply ;

  const localBlockchainData = async () => {
    let provider;

    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
      setProvider(provider);
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      const signerAcc = await provider.getSigner();
      console.log("signer", signerAcc)
      setProvider(provider);

      // Get the network
      const network = await provider.getNetwork();
      const chainIdString = network.chainId.toString();

      console.log("chainIdString", chainIdString)
      console.log("network", network)
      console.log("network-chainId", network.chainId)

      if (Number(network.chainId) === 31337) {
        console.log("Connected to Hardhat local network (31337)");
      } else {
        console.log("Not connected to Hardhat local network");
      }

      // Use the provider (not the signer) for read-only calls like totalSupply
      const realEstate = new ethers.Contract(config[chainIdString].realEstate.address, RealEstate, provider);
      try {
        totalSupply = await realEstate.totalSupply();
        console.log("Total Supply:", totalSupply.toString());
      } catch (error) {
        console.error("Error fetching total supply:", error);
      }

      const homes = []
      for (let i = 1; i < totalSupply; i++) {
        const uri = await realEstate.tokenURI(i)
        const response = await fetch(uri)
        const metadata = await response.json()
        homes.push(metadata)
      }

      setHomes(homes)
      // const uri = await realEstate.tokenURI(2)
      // const response = await fetch(uri)
      // const metadata = await response.json()

      // console.log("uri",uri)
      // console.log("response",response)
      // console.log("metadata",metadata)

      const escrow = new ethers.Contract(config[chainIdString].escrow.address, Escrow, provider);
      setEscrow(escrow)


      try {
        const getBalance = await escrow.getBalance();
        console.log("getBalance:", getBalance);
      } catch (error) {
        console.error("Error fetching getBalance:", error);
      }
      // Use the signer for operations that require account interaction

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("Account:", accounts[0]);
    }

    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const account = ethers.getAddress(accounts[0]);
      setCurrentAccount(account);
    });
  };

  useEffect(() => {
    localBlockchainData();
  }, []);

  const togglePop = (home) => {
    // console.log(home)
    setHome(home)
    toggle ? setToggle(false) : setToggle(true);
  }

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  
  return (
    <div>
      <Navigation account={currentAccount} setAccount={setCurrentAccount} />
      <Search />
      <button id="dark-mode-toggle" onClick={handleThemeToggle} style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '10px 20px',
        border: 'none',
        backgroundColor: '#6c63ff',
        color: '#FFFFFF',
        borderRadius: '25px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.3s',
      }}>
        {darkMode ? <FaSun /> : <FaMoon />}
        
        </button>
      <div className='cards__section'>

        <h3>Welcome to HouseKeeper</h3>
        <hr />

        <div className='cards'>
          {homes.map((home, index) => (
            <div className='card' key={index} onClick={() => togglePop(home)}>
              <div className='card__image'>
                <img src={home.image} alt="Home" />
              </div>
              <div className='card__info'>
                <h4>{home.attributes[0].value} ETH</h4>
                <p>
                  <strong>{home.attributes[2].value}</strong> bds |
                  <strong>{home.attributes[3].value}</strong> ba |
                  <strong>{home.attributes[4].value}</strong> sqft
                </p>
                <p>{home.address}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {toggle && (
        <Home home={home} provider={provider} account={currentAccount} escrow={escrow} togglePop={togglePop} />
      )}

    </div>
  );
}

export default App;
