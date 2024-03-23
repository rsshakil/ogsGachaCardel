
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook'

export default function useGTMEvents() {
// export const useGTMEvents = () => {
	const sendDataToGTM = useGTMDispatch()
	return {
		// TOPページ
		conversionTop: () => {
			sendDataToGTM({
				event: 'topView',
			})
		},
		// オリパページ
		conversionOripa: (oripaName) => {
			sendDataToGTM({
				event: 'oripaView',
				"oripaName": oripaName
			})
		},
		// 仮会員登録完了
		conversionTemporaryRegist: () => {
			sendDataToGTM({
				event: 'temporaryRegistComplete',
			})
		},
		// 本登録完了
		conversionRegist: () => {
			sendDataToGTM({
				event: 'registComplete',
			})
		},
		// 課金完了
		conversionPayment: () => {
			sendDataToGTM({
				event: 'paymentComplete',
			})
		},
		// ガチャ行動
		conversionOripaExecute: (oripaName, numberExection, usagePoints) => {
			sendDataToGTM({
				event: 'executeOripaComplete',
				"oripaName": oripaName,
				"numberExection": numberExection,
				"usagePoints": usagePoints
			})
		},
		// クーポン使用
		conversionUsageCoupon: (couponCode) => {
			sendDataToGTM({
				event: 'executeCouponComplete',
				"couponCode": couponCode
			})
		},
	}
}