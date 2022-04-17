export default [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "new_admin",
				"type": "address"
			}
		],
		"name": "add_admin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "new_assistant",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "f",
				"type": "bool"
			}
		],
		"name": "add_assistant",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "re_address",
				"type": "address"
			}
		],
		"name": "add_re",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "year_time",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "no",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "f",
				"type": "uint256"
			}
		],
		"name": "approve_withdrawal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "re_address",
				"type": "address"
			}
		],
		"name": "join_super",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "q_all",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "account",
				"type": "address"
			}
		],
		"name": "q_releaseETH",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "payees",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "shares_",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[3]",
				"name": "fee",
				"type": "uint256[3]"
			},
			{
				"internalType": "uint256[]",
				"name": "_interest",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_conditional_value",
				"type": "uint256[]"
			}
		],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "PaymentReceived",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "_user_address",
				"type": "address[]"
			}
		],
		"name": "q_all_array",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_user_address",
				"type": "address"
			}
		],
		"name": "q_by_assistant",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "q_release",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "re_withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "fcs",
				"type": "bool"
			}
		],
		"name": "set_close_something",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "set_split_accounts",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "set_time_tamp",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_under_amount",
				"type": "uint256"
			}
		],
		"name": "set_under_amount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_user_address",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "f",
				"type": "bool"
			}
		],
		"name": "set_user_freeze",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "setFirstReferralAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "new_admin",
				"type": "address"
			}
		],
		"name": "update_admin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_conditional_value",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_interest_value",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "k",
				"type": "uint256"
			}
		],
		"name": "update_conditional_value",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_re_address",
				"type": "address"
			}
		],
		"name": "update_re",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "k",
				"type": "uint256"
			}
		],
		"name": "update_Re_fee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_user_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "principal",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw_super",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_user_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "calculate_earnings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_user_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "calculate_earnings_super",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "user_s",
				"type": "address[]"
			},
			{
				"internalType": "uint256",
				"name": "kkd",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "k",
				"type": "uint256"
			}
		],
		"name": "dv",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "get_Calculate_Earnings_All",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_conditional_value",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_interest",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "get_king_sort",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "_released",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "_us",
						"type": "address"
					}
				],
				"internalType": "struct WithdrawLibrary.king_sort[10]",
				"name": "",
				"type": "tuple[10]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_type",
				"type": "uint256"
			}
		],
		"name": "get_PSL_data",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_Re_fee",
		"outputs": [
			{
				"internalType": "uint256[3]",
				"name": "",
				"type": "uint256[3]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_user_address",
				"type": "address"
			}
		],
		"name": "get_re_interests",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "_released",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_income",
						"type": "uint256"
					}
				],
				"internalType": "struct WithdrawLibrary._interests_info",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "get_re_log_info",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "_u",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "re_no",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_times",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_interests",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct WithdrawLibrary._logInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "get_re_withdraw_all",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_user_address",
				"type": "address"
			}
		],
		"name": "get_Record_interest",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "year_time",
				"type": "string"
			}
		],
		"name": "get_review_data",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "u_address",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "status",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "time_s",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_type",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "no",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "has",
						"type": "bool"
					}
				],
				"internalType": "struct WithdrawLibrary.review_data[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "year_time",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "f",
				"type": "uint256"
			}
		],
		"name": "get_review_data_is_or_not_approved",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "u_address",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "status",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "time_s",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_type",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "no",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "has",
						"type": "bool"
					}
				],
				"internalType": "struct WithdrawLibrary.review_data[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_u_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "year_time",
				"type": "string"
			}
		],
		"name": "get_review_user_data",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "u_address",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "status",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "time_s",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_type",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "no",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "has",
						"type": "bool"
					}
				],
				"internalType": "struct WithdrawLibrary.review_data[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_split_accounts",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "year_time",
				"type": "string"
			}
		],
		"name": "get_time_join_data",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "_deposit",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_withdrawal",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_re_withdrawal",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_principal_withdrawal",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_user_counts",
						"type": "uint256"
					}
				],
				"internalType": "struct WithdrawLibrary.economy_data",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_time_tamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_under_amount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "u",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "k",
				"type": "uint256"
			}
		],
		"name": "get_user_All_re_BalanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_user_address",
				"type": "address"
			}
		],
		"name": "get_user_info",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "end_time",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "withdraw_times",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "interest_bearing_principal",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "f",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "freeze",
						"type": "bool"
					}
				],
				"internalType": "struct WithdrawLibrary._User",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "get_user_log_info",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "_u",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "re_no",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_times",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_interests",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct WithdrawLibrary._logInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "get_withdraw_all",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getQ_counts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getRes",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getRes1",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getRes2",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getResChildS1",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getResChildS2",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getResChildS3",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bool",
						"name": "f",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "re",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "re1",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "re2",
						"type": "address"
					}
				],
				"internalType": "struct ReferralRelationshipLibrary.Re",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUsers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUsersCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "new_assistant",
				"type": "address"
			}
		],
		"name": "is_assistant",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "isRe",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "payee",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
