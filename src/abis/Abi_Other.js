export default [
	{
		inputs: [
			{
				internalType: 'address',
				name: '_address',
				type: 'address',
			},
		],
		name: 'set_qy_address',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		inputs: [],
		name: 'get_qy_address',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'contract IERC20',
				name: '_address',
				type: 'address',
			},
		],
		name: 'getAllBalanceOf',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'contract IERC20',
				name: '_address',
				type: 'address',
			},
		],
		name: 'getAllBalanceOf_',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'contract IERC20',
				name: '_address',
				type: 'address',
			},
		],
		name: 'is_allowance',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'contract IERC20',
				name: '_address',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_userAddress',
				type: 'address',
			},
		],
		name: 'is_allowances',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
]
