import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const AddressBalance = ({ address }) => {
  const [data, setData] = useState();
  const { addressId } = useParams();
  const searchTerm = address || addressId;

  useEffect(() => {
    const getAddressData = async () => {
      const balance = await alchemy.core.getBalance(searchTerm, "latest");
      const balanceNumber = parseInt(balance._hex) / 10 ** 18;

      const tokenBalances = await alchemy.core.getTokenBalances(searchTerm);
      const nonZeroBalances = tokenBalances.tokenBalances.filter((token) => {
        return token.tokenBalance !== "0";
      });

      const tokenList = [];

      for (let token of nonZeroBalances) {
        let balance = token.tokenBalance;

        const metadata = await alchemy.core.getTokenMetadata(
          token.contractAddress
        );

        balance = balance / Math.pow(10, metadata.decimals);
        balance = balance.toFixed(5);

        if (balance > 0.0) {
          tokenList.push({
            name: metadata.name,
            balance,
            symbol: metadata.symbol,
            contractAddress: token.contractAddress,
          });
        }
      }
      setData([balanceNumber.toFixed(6), tokenList]);
    };
    getAddressData();
  }, [searchTerm]);

  if (!data) {
    return <p className="text-center py-30">Querying Data...</p>;
  }

  return (
    <div>
      <h3 className="text-center text-xl py-8 font-semibold">
        ETH Balance for address {searchTerm}: <span className='underline'>{data[0]}</span>
      </h3>
      <table className="w-full">
        <tr className="border-b-2 font-semibold text-lg">
          <td>Symbol</td>
          <td>Token Name</td>
          <td>Balance</td>
          <td>Contract Address</td>
        </tr>

        {data[1].map((token, i) => {
          return (
            <tr className="border-b text-start" key={i}>
              <td>{token.symbol}</td>
              <td>{token.name}</td>
              <td>{token.balance}</td>
              <Link
                to={`/address-tx/${token.contractAddress}`}
                className="text-blue-800 hover:underline"
              >
                <td>{token.contractAddress}</td>
              </Link>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default AddressBalance;
