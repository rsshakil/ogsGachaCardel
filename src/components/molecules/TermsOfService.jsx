import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { productListState } from "../../store/recoil/productListState";
import { Headline } from "../atoms/text/Headline";
import '../../css/TermsOfService.css';
import '../../css/textPanel.css';

// import { useNavigate } from 'react-router-dom';
let productWrapStyle = 'aspect-[3/2] w-full overflow-hidden rounded';
let productBgStyle = 'transition transform duration-150 ease-in w-full h-full bg-no-repeat bg-cover bg-center hover:scale-125';
let class1stLevelLi = '';
let class1stLevelSpan = 'font-bold text-base sm:text-xl leading-loose';

let class3rdLevelUl = 'pl-4 py-4';
let class3rdLevelLi = 'pl-4 text-sm sm:text-base';
let class3rdLevelSpan = 'font-bold';
let class3rdLevelP = 'font-normal text-sm sm:text-base';

let class4thLevelUl = 'pl-4';
let class4thLevelLi = 'pl-4 text-sm sm:text-base';

let class5thLevelUl = 'pl-4';
let class5thLevelLi = 'pl-4';

export const TermsOfService = () => {
    const [productListArray, setProductList] = useRecoilState(productListState);
    console.log("[ProductList]", productListArray)
    
    

    return (
    <>
        <section id="informationWrap" className={`flex justify-center text-white py-8 px-4`}>
        <div className="w-256 grid grid-cols-1 gap-4 justify-items-center">
            <Headline 
                        type="h1"
                        spanText=""
                        spanClass="text-center text-sm text-white drop-shadow-md"
                        headlineText="利用規約"
                        headlineClass="text-center text-5xl font-bold font-Prompt text-white flex flex-col drop-shadow-md"
            />
            <div className="text-panel w-full lg:w-256">
                <div className="text-panel-inner px-10 sm:px-12 md:px-14 lg:px-16 py-16 text-white">
                    <span className="font-bold">本利用規約（以下「本規約」といいます。）は、本サービスのご利用に関して、当社とユーザーとの間における権利義務関係を規律するものであり、法的拘束力を有します（以上における用語の定義は本規約第１条に定めるとおり）。ユーザーは、本サービスのご利用にあたり、本規約を十分にご確認のうえ、全ての内容に同意していただく必要があります。</span>
                    <ul className="grid grid-cols-1 gap-4 sm:gap-12 font-Prompt text-white pt-8">
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>第1章 総則</span>
                            <ul className={`${class3rdLevelUl}`}>
                                <ul className={`${class3rdLevelUl} list-none`}>
                                <span className={`${class3rdLevelSpan}`}>第1条 定義</span>
                                <p className={`${class3rdLevelP}`}>本規約において、以下の各号に掲げる用語の定義は、当該各号に定めるとおりとします。</p>
                                    <li className={`${class3rdLevelLi} bracket`}>「本サービス」とは、株式会社ヤムヤム（以下「当社」といいます。）が提供するウェブアプリケーション「カーデル」及びこれに付随して当社が提供するサービスを指します。</li>
                                    <li className={`${class3rdLevelLi} bracket`}>「ユーザー登録」とは、本サービスを利用する前提として、本サイト上で実施していただく当社所定の手続を指します。</li>
                                    <li className={`${class3rdLevelLi} bracket`}>「ユーザー情報」とは、ユーザー登録にあたり、当社が提供を求める氏名、住所、連絡先その他一切の情報を指します。</li>
                                    <li className={`${class3rdLevelLi} bracket`}>「ユーザー」とは、ユーザー登録を完了し、本サービスの利用権限を取得した個人を指します。</li>
                                    <li className={`${class3rdLevelLi} bracket`}>「アカウント情報」とは、当社が個々のユーザーを識別するための情報であり、ユーザーが登録したメールアドレス及びパスワードを指します。</li>
                                    <li className={`${class3rdLevelLi} bracket`}>「トレカ」とは、トレーディングカードの略称であり、様々な種類の絵柄等が印刷されている観賞用又はゲーム用のカードであり、収集・交換されることを想定して販売・配布されているものを指します。</li>
                                    <li className={`${class3rdLevelLi} bracket`}>「デジタルトレカ」とは、ユーザーが本サービス内でオリパを購入することで獲得できるデジタルコンテンツ（トレカの画像データを含みます。）を指します。</li>
                                    <li className={`${class3rdLevelLi} bracket`}>「同一トレカ」とは、デジタルトレカと同一種類の現実のトレカを指します。</li>
                                    <li className={`${class3rdLevelLi} bracket`}>「オリパ」とは、本サービス内でデジタルトレカがランダムに選択される仕組み及び本サービス内で当社が販売する商品を指します。ユーザーは、本サービス内でオリパを購入することにより、ランダムに選択された種類のデジタルトレカを獲得できます。</li>
                                    <li className={`${class3rdLevelLi} bracket`}>「ポイント」とは、当社が本サービス内で発行する前払式支払手段（資金決済法第３条第１項第１号）のことであり、オリパの購入等に利用できるものを指します。</li>
                                    <li className={`${class3rdLevelLi} bracket`}>「退会」とは、ユーザーが本サービスの利用権限を喪失することを指します。</li>
                                </ul>

                                <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                    <span className={`${class3rdLevelSpan}`}>第2条 ユーザー登録</span>
                                    <li className={`${class3rdLevelLi}`}>ユーザーとなることを希望する者（以下「登録希望者」といいます。）は、当社が本サービス内で定める方法に従って、当社に対し、ユーザー情報を提供することにより、ユーザー登録をすることができます。また、登録希望者は、ユーザー登録にあたり、正確かつ最新の会員情報を提供しなければならず、いかなる理由があろうとも、他人名義又は架空名義でユーザー登録することはできません。</li>
                                    <li className={`${class3rdLevelLi}`}>未成年者がユーザー登録をする場合、事前に親権者など法定代理人の包括的な同意を得なければなりません。未成年者によるユーザー登録の場合、法定代理人の同意の有無に関して、当社から未成年者又は法定代理人に対し、確認の連絡をする場合があります。</li>
                                    <li className={`${class3rdLevelLi}`}>当社は、登録希望者が次の各号のいずれか一にでも該当すると判断した場合、ユーザー登録を拒否することがあります。また、当社は、ユーザー登録を拒否するにあたり、その理由を開示いたしません</li>
                                        <ul className={`${class4thLevelUl}`}>
                                            <li className={`${class4thLevelLi} bracket`}>当社の事業と競合する事業を行っている場合</li>
                                            <li className={`${class4thLevelLi} bracket`}>過去に当社のサービスを不正に利用していた場合</li>
                                            <li className={`${class4thLevelLi} bracket`}>本サービスの強制退会に該当し得る事情がある場合</li>
                                            <li className={`${class4thLevelLi} bracket`}>本規約に違反する恐れがある場合</li>
                                            <li className={`${class4thLevelLi} bracket`}>ユーザー情報に虚偽又は不適切な内容が含まれている場合</li>
                                            <li className={`${class4thLevelLi} bracket`}>法定代理人の同意を得ていない未成年者の恐れがある場合</li>
                                            <li className={`${class4thLevelLi} bracket`}>前各号のほか、ユーザー登録を承諾することが適切ではない場合</li>
                                        </ul>
                                    <li className={`${class3rdLevelLi}`}>当社に拒否をされることなくユーザー登録が完了した場合、登録希望者は、ユーザーとしての地位を取得します。</li>
                                    <li className={`${class3rdLevelLi}`}>ユーザー登録は、原則として１人１登録とし、複数の登録はできないものとする。複数の登録が発覚した場合、事前の告知無く当該ユーザーアカウントを削除する。</li>
                                </ul>

                                <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                    <span className={`${class3rdLevelSpan}`}>第3条 ユーザー情報の変更</span>
                                    <li className={`${class3rdLevelLi}`}>ユーザーは、ユーザー情報の全部又は一部に変更が生じた場合、当社が本サービス内で定める方法に従って、速やかにユーザー情報の変更手続を行わなければならないものとします。</li>
                                    <li className={`${class3rdLevelLi}`}>ユーザーが前項の変更手続きを怠ったことでユーザーに生じた損失について、当社は、一切の責任を負わないものとします。</li>
                                </ul>

                                <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                    <span className={`${class3rdLevelSpan}`}>第4条 本規約の改定</span>
                                    <li className={`${class3rdLevelLi}`}>当社は、本規約の全部又は一部について、随時、改定することができるものとします。</li>
                                    <li className={`${class3rdLevelLi}`}>ユーザーは、本サービスを利用する都度、本規約の内容を必ず確認するものとし、本規約の改定後にユーザーが本サービスを利用した場合、ユーザーは、改定後の本規約に同意したものとみなします。</li>
                                    <li className={`${class3rdLevelLi}`}>当社は、本規約の改定によってユーザーに損害が発生した場合であっても、ユーザーに対し、一切の責任を負わないものとします。</li>
                                </ul>

                            </ul>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>第2章 デジタルトレカの獲得・利用方法等</span>
                            <ul className={`${class3rdLevelUl}`}>
                                <ul className={`${class3rdLevelUl} list-none`}>
                                <span className={`${class3rdLevelSpan}`}>第5条 デジタルトレカの獲得</span>
                                <p className={`${class3rdLevelP}`}>ユーザーは、本サービス内において、当社所定の数量のポイントを利用してオリパを購入することでデジタルトレカを獲得し、それを本サービス内で保有することができます。</p>
                                </ul>

                                <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                    <span className={`${class3rdLevelSpan}`}>第6条 デジタルトレカの利用方法</span>
                                    <p className={`${class3rdLevelP}`}>ユーザーは、保有するデジタルトレカを以下のいずれかの方法で利用できます。また、以下のいずれかの方法でデジタルトレカを利用した場合、当該デジタルトレカは本サービス内で消滅します。</p>
                                    <li className={`${class3rdLevelLi} bracket`}>ポイントに交換する方法。</li>
                                    <li className={`${class3rdLevelLi} bracket`}>同一トレカに交換する方法。</li>
                                </ul>
                                <ul className={`${class3rdLevelUl} list-none`}>
                                    <span className={`${class3rdLevelSpan}`}>第7条 ポイントに交換する方法</span>
                                    <p className={`${class3rdLevelP}`}>本サービス内において、ユーザーは、デジタルトレカをポイントに交換する申請をすることにより、当該デジタルトレカの種類に応じたポイントを取得できます。</p>
                                </ul>
                                <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                    <span className={`${class3rdLevelSpan}`}>第8条 同一トレカに交換する方法</span>
                                    <li className={`${class3rdLevelLi} `}>本サービス内において、ユーザーは、デジタルトレカの配送申請をすることにより、当該デジタルトレカを同一トレカに交換することができます。但し、ユーザーが１度の配送申請で同一トレカに交換できるデジタルトレカの枚数は１０枚を上限とします。</li>
                                    <li className={`${class3rdLevelLi} `}>前項の配送申請をする場合、ユーザーは、発送先（発送先の住所、受取人の氏名など）を指定することが必要です。但し、ユーザーが同一トレカの発送先として指定できる住所は日本国内に限られるものとし、海外の住所を指定することはできません。</li>
                                    <li className={`${class3rdLevelLi} `}>ユーザーは、同一トレカの配送申請をする度に、３００ポイントを消費します。但し、消費ポイント数に関して本サービス内で別段の表示がある場合、当該表示に従うものとします。</li>
                                    <li className={`${class3rdLevelLi} `}>ユーザーから配送申請を受けた場合、当社は、宅配便又はメール便等の宅配サービスを利用して、ユーザーが指定した発送先を宛先として、同一トレカを発送して引き渡します。当社は、速やかに同一トレカの発送を行うことに努めますが、配送申請の集中等のやむを得ない事情がある場合、発送までに２週間程度の期間を要する場合があります。</li>
                                    <li className={`${class3rdLevelLi} `}>ユーザーの責めに帰すべき事情により、当社が発送した同一トレカが発送先に到達せずに当社に返送された場合、当社は、ユーザーに対し、本サービス内又はメールで通知します。ユーザーは、当社による通知日から５日以内に再度の配送申請（再度、ポイントを消費します。）を行わなければなりません。</li>
                                    <li className={`${class3rdLevelLi} `}>次の各号のいずれかに該当する場合、ユーザーは、同一トレカの引き渡しを受ける権利を喪失します。</li>
                                    <ul className={`${class4thLevelUl}`}>
                                        <li className={`${class4thLevelLi} bracket`}>前項の期間内に再度の配送申請を行わなかった場合</li>
                                        <li className={`${class4thLevelLi} bracket`}>前項による配送申請に基づき当社が同一トレカの発送をしたにもかかわらず、再び当社に返送された場合</li>
                                    </ul>
                                    <li className={`${class3rdLevelLi} `}>ユーザーが同一トレカの配送申請をした場合、ユーザーは、その撤回をすることはできません。</li>
                                </ul>
                                <ul className={`${class3rdLevelUl} list-none`}>
                                    <span className={`${class3rdLevelSpan}`}>第9条 同一トレカの品質</span>
                                    <p className={`${class3rdLevelP}`}>ユーザーの配送申請を受けて当社が引渡しをする同一トレカは、当社独自の基準による品質検査に合格した中古品ですが、中古品であるため些細なキズ・損傷・汚れなどが存在することがあります。ユーザーは、そのような品質であることを予め承諾するものとし、当社が引き渡した同一トレカの品質を理由として、交換又は返金の要求、損害賠償の請求、異議申立てなどをすることができないものとします。</p>
                                </ul>
                                <ul className={`${class3rdLevelUl} list-none`}>
                                    <span className={`${class3rdLevelSpan}`}>第10条 所有権の移転等</span>
                                    <p className={`${class3rdLevelP}`}>ユーザーの配送申請を受けて当社が引渡しをする同一トレカの所有権は、ユーザーが指定した発送先に同一トレカが到達した時点（ポスト投函を含みます。）をもって、当社からユーザーに対して移転します。また、その時点をもって、当社のユーザーに対する引渡義務の履行は完了したものとし、当社は、それ以降に生じた同一トレカの毀損、汚損、滅失、盗難等について、一切の責任を負わないものとします。</p>
                                </ul>
                                <ul className={`${class3rdLevelUl} list-none`}>
                                    <span className={`${class3rdLevelSpan}`}>第11条 同一トレカの交換期間</span>
                                    <p className={`${class3rdLevelP}`}>ユーザーは、デジタルトレカの獲得後１０日以内に限り、当該デジタルトレカを同一トレカに交換することができます。ユーザーが当該期間内にデジタルトレカを同一トレカに交換しなかった場合（配送申請をしなかった場合）、当該デジタルトレカは自動的にポイントに交換されます。</p>
                                </ul>
                            </ul>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>第3章 ポイントの購入・消滅等</span>
                            <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                <span className={`${class3rdLevelSpan}`}>第12条 ポイントの購入</span>
                                <li className={`${class3rdLevelLi} `}>ユーザーは、本サービス内でポイントを購入することができます。また、ポイントの金額は１ポイント＝１円であり、購入できるポイントの最小単位は５００ポイントとなります。</li>
                                <li className={`${class3rdLevelLi} `}>ポイントの購入方法は次のいずれの方法となります。但し、当社が異なる方法によるポイントの購入を事前に承諾した場合、この限りではありません。</li>
                                <ul className={`${class4thLevelUl}`}>
                                    <li className={`${class4thLevelLi} bracket`}>クレジットカードによる決済</li>
                                    <li className={`${class4thLevelLi} bracket`}>PayPayによる決済</li>
                                </ul>
                                <li className={`${class3rdLevelLi} `}>不正行為やマネーロンダリングを防ぐ為、決済に利用したクレジットカード番号の確認や写真を求める場合があります。</li>
                                <li className={`${class3rdLevelLi} `}>別人のクレジットカードや決済アプリの利用は禁止されています。</li>
                            </ul>
                            <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                <span className={`${class3rdLevelSpan}`}>第13条 ポイントの消滅等</span>
                                <li className={`${class3rdLevelLi} `}>ユーザーが購入又は交換、その他の方法によって取得したポイントは、そのポイントを取得した日から９０日間（以下「有効期間」といいます。）を経過することで、自動的に消滅します。</li>
                                <li className={`${class3rdLevelLi} `}>ユーザーは、ポイントの有効期間を自ら厳重に管理するものとします。ユーザーは、有効期間の経過によってポイントが消滅した場合であっても、当社に対し、一切の責任を追及することはできません。</li>
                                <li className={`${class3rdLevelLi} `}>ユーザーが本サービス内でポイントを消費した場合、有効期間の残日数が少ないポイントから順次消費されるものとします。</li>
                                <li className={`${class3rdLevelLi} `}>複数の登録が発覚した場合、アカウントに保有されているポイントは全て失効とする。また、過去のポイント利用による商品の取得も無効となる。</li>
                                <li className={`${class3rdLevelLi} `}>ボーナス、プレゼント、キャンペーン期間中の不正（重複アカウントの作成、弊社から許可を得ていない方法を用いての不特定多数の人間への拡散、その他利用規約に違反する行為）を禁じます。不正によって得たポイントを保有しているユーザーは、アカウント内の保有ポイントすべてが削除対象となります。また購入したポイント以外の全てのポイント消費分が不正取得扱いとなり、実費での購入対象となりますので不正を働かないように気をつけてください。</li>
                            </ul>
                        </li>

                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>第4章 禁止行為等</span>
                            <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                <span className={`${class3rdLevelSpan}`}>第14条 アカウント情報の管理</span>
                                <li className={`${class3rdLevelLi} `}>ユーザーは、自らのアカウント情報を適切に管理し、アカウント情報が第三者に漏洩することを防止する措置を講じるものとします。</li>
                                <li className={`${class3rdLevelLi} `}>第三者がユーザーのアカウント情報を不正利用したことよってユーザーが損害を被った場合、その原因が当社の故意・過失によるものでない限り、当社は、一切の責任を負わないものとします。また、第三者による不正利用の原因がユーザーの故意・過失によるものである場合、それによって生じた当社の損害について、ユーザーは、損害賠償の責任を負うものとします。</li>
                                <li className={`${class3rdLevelLi} `}>ユーザーは、自らのアカウント情報が漏洩し、若しくは第三者に利用されていること、又はそれらの恐れがあることを認知した場合、当社に対し、直ちにその旨を通知し、かつ、当社の指示に従うものとします。</li>
                            </ul>
                            <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                <span className={`${class3rdLevelSpan}`}>第15条 反社会的勢力の排除</span>
                                <p className={`${class3rdLevelP}`}>ユーザーは、当社に対し、現在及び将来において、次の各号に掲げる者には該当しないことを表明し、保証するものとします。</p>
                                <li className={`${class3rdLevelLi} bracket`}>暴力団、暴力団員、暴力団員でなくなった時から5年を経過しない者、暴力団準構成員、暴力団関係企業、総会屋等、社会運動等標ぼうゴロ又は特殊知能暴力集団等その他これらに準ずる者（以下総称して「反社会的勢力」といいます。）</li>
                                <li className={`${class3rdLevelLi} bracket`}>反社会的勢力が経営を支配していると認められる者</li>
                                <li className={`${class3rdLevelLi} bracket`}>反社会的勢力が経営に実質的に関与していると認められる者</li>
                                <li className={`${class3rdLevelLi} bracket`}>自己若しくは第三者の不正の利益を図る目的又は第三者に損害を加える目的をもってする等、不当に反社会的勢力を利用していると認められる者</li>
                                <li className={`${class3rdLevelLi} bracket`}>反社会的勢力に対して資金等を提供し、又は便宜を供与する等の関与をしていると認められる者</li>
                                <li className={`${class3rdLevelLi} bracket`}>前各号のほか、反社会的勢力と社会的に非難されるべき関係を有する者</li>
                            </ul>
                            <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                <span className={`${class3rdLevelSpan}`}>第16条 一般的禁止行為</span>
                                <p className={`${class3rdLevelP}`}>ユーザーは、本サービスの利用にあたり、次の各号に掲げる行為をしてはならないものとします。</p>
                                <li className={`${class3rdLevelLi} bracket`}>他者の生命、身体、財産、プライバシー、著作権、商標権その他の権利及び法律上保護される利益を侵害し、又は侵害するおそれのある行為</li>
                                <li className={`${class3rdLevelLi} bracket`}>当社が本サービスを提供している目的とは異なる目的で本サービスを利用する行為</li>
                                <li className={`${class3rdLevelLi} bracket`}>虚偽の情報を用いてユーザー登録を行う行為</li>
                                <li className={`${class3rdLevelLi} bracket`}>複数のメールアドレス等を用いることで複数のユーザー登録を行う行為</li>
                                <li className={`${class3rdLevelLi} bracket`}>自らのアカウント情報を第三者に使用させる行為</li>
                                <li className={`${class3rdLevelLi} bracket`}>第三者のアカウント情報を使用する行為</li>
                                <li className={`${class3rdLevelLi} bracket`}>当社のサーバその他の設備に無権限でアクセスする行為</li>
                                <li className={`${class3rdLevelLi} bracket`}>当社による業務の遂行を妨害し、又はその恐れのある行為</li>
                                <li className={`${class3rdLevelLi} bracket`}>当社の名誉若しくは信用を侵害し、又はその恐れのある行為</li>
                                <li className={`${class3rdLevelLi} bracket`}>著作権法その他の法令に違反する行為</li>
                                <li className={`${class3rdLevelLi} bracket`}>前各号のほか、社会通念に照らして不適切だと評価される一切の行為</li>
                                <li className={`${class3rdLevelLi} bracket`}>決済購入以外のキャンペーンなどで付与されるポイントを不正に取得する行為</li>
                                <li className={`${class3rdLevelLi} bracket`}>登録者本人以外の名前や情報を用いて、アカウント作成、各種登録、決済、発送申請等の行為</li>
                                <li className={`${class3rdLevelLi} bracket`}>上記（1）から（12）の行為により、当社に損害を与えた場合、弁護士費用・調査費用・損害相当額・機会損失相当額・不正に取得したポイント相当額・正当なクレジットカード名義人への返金額・その他紛争解決に要した諸経費全てを範囲として賠償請求します</li>
                            </ul>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>第5章 本サービスの変更・停止等</span>
                            <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                <span className={`${class3rdLevelSpan}`}>第17条 機能の追加・停止等</span>
                                <li className={`${class3rdLevelLi} `}>当社は、本サービスの有用性を向上させるため、随時、本サービスの機能の追加、変更、停止等をすることができるものとし、ユーザーは、これに予め承諾します。</li>
                                <li className={`${class3rdLevelLi} `}>前項に基づく本サービスの機能の追加、変更、停止等によってユーザーに損害が生じた場合であっても、当社は、当該損害に関する責任を一切負わないものとします。</li>
                            </ul>
                            <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                <span className={`${class3rdLevelSpan}`}>第18条 本サービスの一時停止</span>
                                <li className={`${class3rdLevelLi} `}>当社は、次の各号のいずれかに該当する事由が発生した場合、ユーザーに対する事前の通知なく、本サービスの提供を一時的に停止することができるものとします。</li>
                                <ul className={`${class4thLevelUl}`}>
                                    <li className={`${class4thLevelLi} bracket`}>サーバ、システム等の保守・点検を行う場合</li>
                                    <li className={`${class4thLevelLi} bracket`}>サーバ、システム等に障害・不具合が発生した場合</li>
                                    <li className={`${class4thLevelLi} bracket`}>火災、停電等により本サービスの提供が困難となった場合</li>
                                    <li className={`${class4thLevelLi} bracket`}>地震、噴火、洪水、津波等の天災により本サービスの提供が困難となった場合</li>
                                    <li className={`${class4thLevelLi} bracket`}>戦争、動乱、暴動、騒乱、労働争議等により本サービスの提供が困難となった場合</li>
                                    <li className={`${class4thLevelLi} bracket`}>前各号のほか、当社が本サービスの提供を一時的に中断する必要があると判断した場合</li>
                                </ul>
                                <li className={`${class3rdLevelLi} `}>当社が前項に基づき本サービスの提供を一時的に停止したことでユーザーに損害が発生した場合であっても、当社は、ユーザーに対し、一切の責任を負わないものとします。</li>
                            </ul>
                            <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                <span className={`${class3rdLevelSpan}`}>第19条 本サービスの終了</span>
                                <li className={`${class3rdLevelLi} `}>当社は、本サービス内で１ヶ月前までに告知することにより、本サービスの提供を終了することができます。但し、やむを得ない事由がある場合、当社は、事前の告知なく、即時に本サービスの提供を終了することができるものとします。</li>
                                <li className={`${class3rdLevelLi} `}>当社が本サービスの提供を終了した場合、ユーザーが保有するポイントは消滅します。また、本サービスの終了日以降、ユーザーは、当社に対し、デジタルトレカを同一トレカに交換することを求めることはできないものとします。</li>
                                <li className={`${class3rdLevelLi} `}>当社が第１項に基づき本サービスの提供を終了したことでユーザーに損害が発生した場合であっても、当社は、ユーザーに対し、一切の責任を負わないものとします。</li>
                            </ul>
                        </li>
                        <li className={`${class1stLevelLi}`}>
                            <span className={`${class1stLevelSpan}`}>第6章 退会</span>
                            <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                <span className={`${class3rdLevelSpan}`}>第20条 退会</span>
                                <li className={`${class3rdLevelLi} `}>ユーザーは、本サービス内で所定の手続を行うことにより、本サービスを任意に退会することができます。</li>
                                <li className={`${class3rdLevelLi} `}>当社は、ユーザーが次の各号のいずれか一にでも該当した場合、事前に何らの通知をすることなく、当該ユーザーを強制的に退会させることができるものとします。また、当社は、当該クライアントに対し、強制退会となった理由の説明義務を負わないものとします。</li>
                                <ul className={`${class4thLevelUl}`}>
                                    <li className={`${class4thLevelLi} bracket`}>本規約、法令又は公序良俗に違反する行為をした場合</li>
                                    <li className={`${class4thLevelLi} bracket`}>表明保証した事実に反する事実が発覚した場合</li>
                                    <li className={`${class4thLevelLi} bracket`}>ユーザー情報に虚偽があった場合</li>
                                    <li className={`${class4thLevelLi} bracket`}>暴言、執拗な連絡、過度なクレームその他当社の業務を妨害する行為があった場合</li>
                                    <li className={`${class4thLevelLi} bracket`}>当社の名誉、信用その他の権利又は法的利益を毀損・侵害する行為があった場合</li>
                                    <li className={`${class4thLevelLi} bracket`}>前各号のほか、当社がユーザーとして不適切であると判断した場合。</li>
                                </ul>
                                <li className={`${class3rdLevelLi} `}>ユーザーが本サービスを任意に退会し、又は強制的に退会させられた場合、ユーザーは、保有するポイントを全て喪失するとともに、保有するデジタルトレカを同一トレカに交換する権利、トレカを受け取る権利その他本サービス内で通用する一切の権利を喪失します。</li>
                                <li className={`${class3rdLevelLi} `}>当社が第２項に基づきユーザーを強制的に退会させた場合であっても、ユーザーは、当社に対し、一切の損害賠償を請求することができないものとします。</li>
                            </ul>
                            <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                <span className={`${class3rdLevelSpan}`}>第21条 免責</span>
                                <li className={`${class3rdLevelLi} `}>ユーザーがデジタルトレカを同一トレカに交換した場合であっても、次の各号のいずれかに該当する事由があるときは、当社は、ユーザーに対し、当該デジタルトレカの種類に応じたポイントを付与することにより、同一トレカの引渡義務を免れるものとします。</li>
                                <ul className={`${class4thLevelUl}`}>
                                    <li className={`${class4thLevelLi} bracket`}>同一トレカの流通量の減少、価格の著しい高騰その他の事由により、当社が同一トレカの仕入れをすることが物理的又は経済的に困難となった場合</li>
                                    <li className={`${class4thLevelLi} bracket`}>本サービスに関するシステムのバグ、エラー、ハッキング等の理由によって、ユーザーが当社の想定外の種類又は数量のデジタルトレカを獲得してしまった場合</li>
                                    <li className={`${class4thLevelLi} bracket`}>前各号のほか、やむをえない事由がある場合</li>
                                </ul>
                                <li className={`${class3rdLevelLi} `}>ユーザーがデジタルトレカを同一トレカに交換した場合であっても、ユーザーが不正な行為を用いたり、利用規約に違反した上でデジタルトレカを獲得した恐れがあるときは、当社は、ユーザーに対し、同一トレカの引き渡しを拒むことができるものとします。この場合、当社は、速やかに事実関係の調査を実施するものとし、ユーザーが正当に当該デジタルトレカを獲得したことを確認できた場合、ユーザーに対し、直ちに同一トレカを引き渡します。</li>
                            </ul>
                            <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                <span className={`${class3rdLevelSpan}`}>第22条 連絡方法</span>
                                <li className={`${class3rdLevelLi} `}>当社からユーザーに対する連絡事項がある場合、当社は、本サービス内で表示する方法、又はユーザー情報として登録された電話番号への電話、メールアドレス宛にメールを送信する方法により、これを行うものとします。</li>
                                <li className={`${class3rdLevelLi} `}>ユーザーから当社に対する連絡事項がある場合、ユーザーは、本サービス内のお問い合わせフォームを用いて連絡を行うものとします。</li>
                            </ul>
                            <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                <span className={`${class3rdLevelSpan}`}>第23条 事業譲渡等</span>
                                <p className={`${class3rdLevelP}`}>当社が第三者に対して本サービスの運営に係る事業を譲渡した場合、当社は、ユーザーからの個別の承諾を得ることなく、当該第三者に対し、本サービス上の当社の地位及び権利義務を移転し、かつ、当社が有するユーザーの情報を提供することができるものとします。</p>
                            </ul>
                            <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                <span className={`${class3rdLevelSpan}`}>第24条 基準時刻</span>
                                <p className={`${class3rdLevelP}`}>本サービスの提供にあたって基準となる時刻は、当社のサーバ内で管理されている時刻を基準とするものとします。</p>
                            </ul>
                            <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                <span className={`${class3rdLevelSpan}`}>第25条 分離可能性</span>
                                <p className={`${class3rdLevelP}`}>本規約の一部が無効な場合であっても、適用可能な条項については有効なものします。</p>
                            </ul>
                            <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                <span className={`${class3rdLevelSpan}`}>第26条 誠実協議</span>
                                <p className={`${class3rdLevelP}`}>本規約に定められていない事項又は本規約の条項の解釈に相違のある事項が生じた場合、当社とユーザーとの間で誠実に協議し、その解決に努めるものとします。</p>
                            </ul>
                            <ul className={`${class3rdLevelUl} list-decimal list-outside`}>
                                <span className={`${class3rdLevelSpan}`}>第27条 準拠法・管轄裁判所</span>
                                <li className={`${class3rdLevelLi} `}>本規約は日本法に基づき解釈されるものとします。</li>
                                <li className={`${class3rdLevelLi} `}>当社とユーザーとの間で本サービスに関する紛争が発生した場合、訴額に応じて東京簡易裁判所又は東京地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
                            </ul>
                        </li>
                    </ul>
                    <p className="text-right">令和５年１２月１日制定</p>
                    <p className="text-right">令和５年１２月１６日改定</p>
                    <p className="text-right">令和６年１月７日改定</p>
                    <p className="text-right">令和６年１月２４日改定</p>
                    <p className="text-right">令和６年２月２日改定</p>
                </div>
            </div>
        </div>
        </section>
    </>
    );
};

