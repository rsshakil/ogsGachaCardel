import {useIntl, IntlProvider} from 'react-intl';
import { defaultMessages } from '../../store/dictionary/default';

export default function ErrorMessage({messageId = ''}) {
    const intl = useIntl();

    const defaultMessage = defaultMessages[intl.locale];
    const errorMessageType = ["G12", "G22", "G30", "G54", "G56", "G60", "G61", "G84", "G92", "G95", "G96", "G97", "G98", "G99"];
    console.log('my default error >>>', defaultMessage)
    return (
       <>
           {
               messageId=="PO02500042"? (
                   <>
                       <p className="pt-4 text-xs text-white">{intl.formatMessage({id: '3Ds_Authentication_Failed'})}</p>
                       <p className=" text-xs text-white  ">{intl.formatMessage({id: 'Please_Try_The_Following_Points'})}</p>
                       <p className="pt-4 text-xs text-white">{intl.formatMessage({id: 'Use_The_Standard_Browser_On_Your_Device_To_Make_A_Payment'})}</p>
                       <p className=" text-xs text-white">{intl.formatMessage({id: 'Set_Up_3D_Secure_Two_Step_Authentication_With_Your_Credit_Card'})}</p>
                       <p className=" text-xs text-white ">{intl.formatMessage({id: 'Restart_Your_Mobile_Device'})}</p>
                       <p className="pt-4 text-xs text-white">{intl.formatMessage({id: 'Only_Credit_Cards_With_3D_Secure'})}</p>
                       <p className=" text-xs text-white">{intl.formatMessage({id: 'Please_Note_That_You_May_Be_Able_To_Succeed_By_Trying_Another_Card'})}</p>
                       <p className=" text-xs text-white">{intl.formatMessage({id: 'If_The_Above_Does_Not_Work_Please_Contact_Our_Support'})}</p>
                   </>
               ) : <p className="pt-4 text-xs text-error-message">⚠️{intl.formatMessage({
                           id: messageId,
                           defaultMessage
                       })}（{messageId}）
                    </p>
           }

           {
               errorMessageType.includes(messageId) &&
               <>
                   <p className="pt-4 text-xs text-white">{intl.formatMessage({id: 'Please_Try_The_Following_Methods'})}</p>
                   <p className=" text-xs text-white">{intl.formatMessage({id: 'Please_Contact_Your_Credit_Card_Company_And_Try_The_Payment_Again'})}</p>
                   <p className=" text-xs text-white">{intl.formatMessage({id: 'Please_Wait_A_While_And_Try_The_Payment_Again'})}</p>
                   <p className=" text-xs text-white">{intl.formatMessage({id: 'Please_Try_The_Payment_Again_With_Another_Available_Card'})}</p>
               </>
           }
       </>
    )
}