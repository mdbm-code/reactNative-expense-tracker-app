import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSendErrorLogMutation } from '../../store/redux/api/apiSlices';
import { clearErrors, setSendingStatus } from '../../store/redux/slices/errorLoggerSlice';

const ErrorLogger = () => {
	const dispatch = useDispatch();
	const errorLog = useSelector((state) => state.errorLogger.errorLog);
	const isSending = useSelector((state) => state.errorLogger.isSending);
	const [sendErrorLog] = useSendErrorLogMutation();

	useEffect(() => {
		const sendErrors = async () => {
			if (errorLog.length > 0 && !isSending) {
				try {
					dispatch(setSendingStatus(true));
					await sendErrorLog(errorLog).unwrap();
					dispatch(clearErrors()); // Очищаем лог после успешной отправки
				} catch (error) {
					console.error('Ошибка при отправке лога ошибок:', error);
				} finally {
					dispatch(setSendingStatus(false));
				}
			}
		};

		// Проверяем наличие интернета
		if (navigator.onLine) {
			sendErrors();
		}
	}, [errorLog, isSending, sendErrorLog, dispatch]);

	return null; // Компонент не рендерит ничего
};

export default ErrorLogger;