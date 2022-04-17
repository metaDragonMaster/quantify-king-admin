/*
    end_time: "0" //上次提取时间
    f: false //是否被封号
    interest_bearing_principal: "0" //本金
    quantity: "0" //已提取
    withdraw_times: "0" //提取次数
*/
export const userInfoInterface = [
	'end_time',
	'f',
	'interest_bearing_principal',
	'quantity',
	'withdraw_times',
	'freeze'
]
export const kingSortInterface = ['_released', '_us']

export const reInterestsInterface = ['_income', '_released']

export const getTimeJoinDataInterface = [
	'_deposit',
	'_principal_withdrawal',
	'_re_withdrawal',
	'_withdrawal',
	'_user_counts',
]
export const getReviewUserDataInterface = [
	'u_address', // 地址
	'amount', // 金额
	'status',//0 等待批准 1 同意 2 拒绝
	'time_s',//时间
	'_type',//1,推广提现，2,本金提现， 3,利息提现
	'no',// 编号
	'has',
]

export const getReviewDataInterface = [
	'u_address', // 地址
	'amount', // 金额
	'status',//0 等待批准 1 同意 2 拒绝
	'time_s',//时间
	'_type',//1,推广提现，2,本金提现， 3,利息提现
	'no',// 编号
	'has',
]
