const Web3 = require("web3");

const abi = [
	{
		inputs: [
			{ internalType: "uint256", name: "_biddingTime", type: "uint256" },
			{
				internalType: "address payable",
				name: "_beneficiary",
				type: "address",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "winner",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "auctionEnded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "bidder",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "highestBidIncreased",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "bidder",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "withdrawSuccess",
		type: "event",
	},
	{
		inputs: [],
		name: "auctionEnd",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "auctionEndTime",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "beneficiary",
		outputs: [{ internalType: "address payable", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "bid",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [],
		name: "highestBidder",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "highestbid",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "withdraw",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "payable",
		type: "function",
	},
];

const init = async () => {
	const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
	const CakeToken = new web3.eth.Contract(
		abi,
		"0x5d1ae3F1ceBD9d61cC51B628394CA7CD70CFae21"
	);
	let options = {
		filter: { _to: "0x8cca721f56c7b908ecf8156bc3157d1fe48fd954" },
		fromBlock: 21655739,
		toBlock: 21655800,
	};
	CakeToken.getPastEvents("highestBidIncreased", options, (err, events) => {
		console.log(events);
	});
	var options1 = {
		reconnect: {
			auto: true,
			delay: 5000, // ms
			maxAttempts: 5,
			onTimeout: false,
		},
		address: "0x8cca721f56c7b908ecf8156bc3157d1fe48fd954",
		topics: [
			"0x6e0e2174dbf7b77c08b6f9a2799b9feda84a6d54a5644864582040100a47d4c5",
		],
	};
	CakeToken.eth.subscribe("logs", options1, function (error, result) {
		if (!error) console.log(result);
	});
	CakeToken.events
		.allEvents()
		.on("data", (event) => {
			console.log(event);
		})
		.on("error", console.error);
};

init();
