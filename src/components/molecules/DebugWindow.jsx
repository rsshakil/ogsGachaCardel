import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { debugState } from "../../store/recoil/debugState";
import { displayState } from "../../store/recoil/displayState";
import { elmState } from "../../store/recoil/elmState";
import { accessState } from "../../store/recoil/accessState";
import { modalState } from "../../store/recoil/modalState";
import { modalBodyData } from "../../store/_trash/modalBodyData";
import { pageLoadiongState } from "../../store/recoil/pageLoadiongState"
import { ceilingGaugeState } from "../../store/recoil/ceilingGaugeState";
import { pointState } from "../../store/recoil/pointState";
import { productListState } from "../../store/recoil/productListState";
import { userState } from "../../store/recoil/userState";
import { historyState } from "../../store/recoil/historyState";
import { gachaHistoryState } from "../../store/recoil/gachaHistoryState";
import { informationStateMultilingual } from "../../store/recoil/informationStateMultilingualV001";
import { ButtonMashState } from "../../store/recoil/ButtonMashState";
import { playScenarioState } from "../../store/recoil/playScenarioState";
import { testingState } from "../../store/recoil/testingState";
import { browserTrackingState } from "../../store/recoil/browserTrackingState";
import session from "../../store/recoil/sessionState";

export const DebugWindow = (props) => {

    const browserTrackingstate = useRecoilValue(browserTrackingState);
    const accessstate = useRecoilValue(accessState);
    const displaystate = useRecoilValue(displayState);
    const debugstate = useRecoilValue(debugState);
    const elmstate = useRecoilValue(elmState);
    const modalstate = useRecoilValue(modalState);
    const modalbodydata = useRecoilValue(modalBodyData);
    const pageLoadiongstate = useRecoilValue(pageLoadiongState);
    const CeilingGaugeState = useRecoilValue(ceilingGaugeState);
    const PointState = useRecoilValue(pointState);
    const ProductListState = useRecoilValue(productListState);
    const UserState = useRecoilValue(userState);
    const HistoryState = useRecoilValue(historyState);
    const GachaHistoryState = useRecoilValue(gachaHistoryState);
    const InformationState = useRecoilValue(informationStateMultilingual);
    const buttonMashState = useRecoilValue(ButtonMashState);
    const SessionState = useRecoilValue(session);
    const PlayScenarioState = useRecoilValue(playScenarioState);
    const TestingState = useRecoilValue(testingState);

    ////////////////////////////////
    const modalStates = JSON.stringify(modalstate,null, '\t');
    const browserTrackingstates = JSON.stringify(browserTrackingstate,null, '\t');
    const modalBodyDataPaymentRequestModal = JSON.stringify(modalbodydata.PaymentRequestModal,null, '\t');
    const modalBodyDataInvoiceModal = JSON.stringify(modalbodydata.InvoiceModal,null, '\t');
    const modalBodyDataExpensesModal = JSON.stringify(modalbodydata.ExpensesModal,null, '\t');
    const modalBodyDataWorksModal = JSON.stringify(modalbodydata.WorksModal,null, '\t');
    const access = JSON.stringify(accessstate,null, '\t');
    const display = JSON.stringify(displaystate,null, '\t');
    const debugStates = JSON.stringify(debugstate,null, '\t');
    const elmstates = JSON.stringify(elmstate,null, '\t');
    const pageLoadiongstates = JSON.stringify(pageLoadiongstate,null, '\t');
    const CeilingGaugeStates = JSON.stringify(CeilingGaugeState,null, '\t');
    const PointStats = JSON.stringify(PointState,null, '\t');
    const ProductListStats = JSON.stringify(ProductListState,null, '\t');
    const UserStates = JSON.stringify(UserState,null, '\t');
    const HistoryStates = JSON.stringify(HistoryState,null, '\t');
    const GachaHistoryStates = JSON.stringify(GachaHistoryState,null, '\t');
    const InformationStates = JSON.stringify(InformationState,null, '\t');
    const ButtonMashStates = JSON.stringify(buttonMashState,null, '\t');
    const SessionStates = JSON.stringify(SessionState,null, '\t');
    const PlayScenarioStates = JSON.stringify(PlayScenarioState,null, '\t');
    const TestingStates = JSON.stringify(TestingState,null, '\t');
    ////////////////////////////////







    const [clicked, setClicked] = useState(100);
    const menus = [
        { title: "UserInfo", content: UserStates },
        { title: "browserTrackingstates", content: browserTrackingstates },
        { title: "ProductList", content: ProductListStats },
        { title: "CeilingGauge", content: CeilingGaugeStates },
        { title: "modal", content: modalStates },
        { title: "Session", content: SessionStates },
        { title: "access", content: access },
        { title: "ButtonMash", content: ButtonMashStates },
        { title: "display", content: display },
        { title: "Point", content: PointStats },
        { title: "History", content: HistoryStates },
        { title: "elmstates", content: elmstates },
        { title: "pageLoadiong", content: pageLoadiongstates },
        { title: "debugStates", content: debugStates },
        { title: "GachaHistory", content: GachaHistoryStates },
        { title: "Information", content: InformationStates },
        { title: "PlayScenario", content: PlayScenarioStates },
        { title: "TestingStates", content: TestingStates },
    ];
    const handleClick = (index) => {
        if (clicked === index) {
            return setClicked(100);
        }
        setClicked(index);
    };
    const contentEl = useRef();

    // console.log(login);
    return (
        
    <div className="overflow-visible break-all">
        <h3 ><span>-RecoilStoreWindow-</span></h3>
        <ul className="space-y-2">
            {menus.map((menu, index) => (
                <li key={index} >
                    <button
                        className="sticky top-0 bg-white text-black border border-slate-600 hover:bg-slate-200"
                        type="button"
                        onClick={() => handleClick(index)}
                        style={
                            clicked === index
                            ? {
                                width: "100%",
                                textAlign: "left",
                                padding: "0.5rem",
                                position: "sticky",
                                // top: elmStateValue.headerHeight + "px",
                                top: 0
                            }
                            : {
                                width: "100%",
                                textAlign: "left",
                                padding: "0.5rem",
                            }
                        }
                    >
                        {"Recoil->["+menu.title+"]"}
                    </button>
                    <div
                        className="h-max overflow-visible break-all"
                        ref={contentEl}
                        style={
                            clicked === index
                            ? {
                                // height: contentEl.current.scrollHeight,
                                backgroundColor: "#e7d0a9",
                            }
                            : { height: "0px", overflow: "hidden" }
                        }
                    >
                        <p className="whitespace-pre-wrap bg-black text-emerald-300 border-gray-300  block  mt-2 px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid rounded" >
                        {menu.content}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
    );
};
