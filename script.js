// =====================================
// IPE CBT - SCRIPT CORE
// index.html + style.css 전용
// =====================================

// =====================
// 상태 변수
// =====================




let currentQuestion = 0;

let examQuestions = [];

let answered = false;

let userAnswers = [];

let chapterStats =
JSON.parse(
localStorage.getItem("chapterStats") || "{}"
);

let wrongQuestions =
JSON.parse(
localStorage.getItem("wrongQuestions") || "[]"
);

// =====================
// 문제은행
// PART 2-A ~ 2-D
// 전체 80문제 붙여넣기
// =====================

const explanations = {

    "의료관련감염(HAI)에 대한 설명으로 가장 옳은 것은?":
    "의료관련감염은 의료기관에서 제공되는 진료·검사·처치 등 의료행위와 관련하여 발생하는 감염을 의미한다.",
    
    "의료관련감염 발생 빈도가 가장 높은 장소는?":
    "중환자실은 침습적 처치와 면역저하 환자가 많아 감염 위험이 가장 높은 장소 중 하나이다.",
    
    "내인성 감염에 해당하는 것은?":
    "내인성 감염은 환자 자신의 정상균총이 면역저하 등의 원인으로 병원성을 나타내며 발생하는 감염이다.",
    
    "외인성 감염 사례는?":
    "외인성 감염은 외부 환경이나 의료기구를 통해 병원체가 유입되어 발생하는 감염이다.",
    
    "감염 전파 경로가 아닌 것은?":
    "접촉전파, 비말전파, 공기전파는 대표적인 감염 전파 경로이며 유전전파는 해당되지 않는다.",

    "AIP(Aging In Place)의 의미는?":
    "AIP는 '살던 곳에서 나이 들기'를 의미하며, 노인이 시설이 아닌 자신이 살던 지역사회에서 계속 생활할 수 있도록 지원하는 개념이다.",
    
    "지역사회 건강관리 패러다임 변화로 옳은 것은?":
    "현대 보건의료는 치료 중심에서 예방 및 통합관리 중심으로 변화하고 있으며 지역사회 기반 관리가 강조된다.",
    
    "Community-Based 관리의 특징은?":
    "지역사회 기반 관리는 질병만이 아닌 생활환경과 복지서비스까지 포함하는 총체적 돌봄을 지향한다.",
    
    "지역사회 건강관리 예시로 적절한 것은?":
    "지역사회 건강관리는 운동, 영양, 복지서비스 등을 연계하여 건강을 관리하는 것을 의미한다.",
    
    "케어코디네이터의 역할은?":
    "케어코디네이터는 환자에게 필요한 보건·의료·복지 서비스를 연결하고 조정하는 역할을 수행한다.",
    
    "건강형평성의 의미는?":
    "건강형평성은 모든 사람이 건강을 유지할 수 있는 공정한 기회를 갖도록 보장하는 것을 의미한다.",
    
    "건강의 사회적 결정요인(SDH)에 해당하지 않는 것은?":
    "건강의 사회적 결정요인에는 교육, 소득, 주거환경 등이 포함되며 혈액형은 해당하지 않는다.",
    
    "취약계층의 설명으로 가장 적절한 것은?":
    "취약계층은 사회적·경제적 요인으로 인해 건강위험이 높고 의료접근성이 낮은 집단을 의미한다.",
    
    "건강불평등의 결과는?":
    "건강불평등은 치료 중단, 만성질환 증가, 기대수명 감소 등의 문제를 초래할 수 있다.",
    
    "건강형평성 수업에서 강조하는 관점은?":
    "건강문제는 개인의 노력만이 아니라 사회구조적 환경과 정책의 영향을 받는다는 관점이 중요하다.",
    
    "의료사고의 주요 원인 중 하나는?":
    "의사소통 실패는 의료사고의 주요 원인으로 꼽히며 환자안전을 위협할 수 있다.",
    
    "심각한 의료사고 중 상당수는 무엇과 관련이 있는가?":
    "많은 의료사고는 정보 전달 부족과 의사소통 오류로 인해 발생한다.",
    
    "능동적 경청의 예는?":
    "능동적 경청은 상대방의 말을 집중해서 듣고 고개를 끄덕이는 등 반응을 보이는 것이다.",
    
    "신뢰를 무너뜨리는 행동은?":
    "상대방의 말을 들으면서 휴대폰을 보는 행동은 신뢰 형성을 방해한다.",
    
    "Thomas-Kilmann 모델의 경쟁 전략 특징은?":
    "경쟁 전략은 자신의 목표 달성을 우선하며 적극성은 높고 협력성은 낮은 특징을 가진다.",
    
    "경쟁 전략이 적절한 상황은?":
    "응급상황처럼 빠른 의사결정이 필요한 경우 경쟁 전략이 효과적일 수 있다.",
    
    "경쟁 전략의 단점은?":
    "경쟁 전략을 과도하게 사용하면 인간관계 악화와 갈등 심화가 발생할 수 있다.",
    
    "AI 활용 사례로 가장 적절한 것은?":
    "스마트워치를 이용한 심방세동 감지는 대표적인 의료 AI 활용 사례이다.",
    
    "AI 윤리 문제에 해당하는 것은?":
    "AI 윤리에서는 책임 소재, 개인정보 보호, 알고리즘 편향 등의 문제가 중요하게 다뤄진다.",
    
    "디지털 소외 현상의 설명으로 적절한 것은?":
    "고령층이나 정보취약계층은 디지털 의료기술 접근이 어려워 디지털 소외가 발생할 수 있다.",
"AIP(Aging In Place)의 의미는?":
"AIP는 '살던 곳에서 나이 들기'를 의미하며, 노인이 시설이 아닌 자신이 살던 지역사회에서 계속 생활할 수 있도록 지원하는 개념이다.",

"지역사회 건강관리 패러다임 변화로 옳은 것은?":
"현대 보건의료는 치료 중심에서 예방 및 통합관리 중심으로 변화하고 있으며 지역사회 기반 관리가 강조된다.",

"Community-Based 관리의 특징은?":
"지역사회 기반 관리는 질병만이 아닌 생활환경과 복지서비스까지 포함하는 총체적 돌봄을 지향한다.",

"지역사회 건강관리 예시로 적절한 것은?":
"지역사회 건강관리는 운동, 영양, 복지서비스 등을 연계하여 건강을 관리하는 것을 의미한다.",

"케어코디네이터의 역할은?":
"케어코디네이터는 환자에게 필요한 보건·의료·복지 서비스를 연결하고 조정하는 역할을 수행한다.",

"건강형평성의 의미는?":
"건강형평성은 모든 사람이 건강을 유지할 수 있는 공정한 기회를 갖도록 보장하는 것을 의미한다.",

"건강의 사회적 결정요인(SDH)에 해당하지 않는 것은?":
"건강의 사회적 결정요인에는 교육, 소득, 주거환경 등이 포함되며 혈액형은 해당하지 않는다.",

"취약계층의 설명으로 가장 적절한 것은?":
"취약계층은 사회적·경제적 요인으로 인해 건강위험이 높고 의료접근성이 낮은 집단을 의미한다.",

"건강불평등의 결과는?":
"건강불평등은 치료 중단, 만성질환 증가, 기대수명 감소 등의 문제를 초래할 수 있다.",

"건강형평성 수업에서 강조하는 관점은?":
"건강문제는 개인의 노력만이 아니라 사회구조적 환경과 정책의 영향을 받는다는 관점이 중요하다.",

"의료사고의 주요 원인 중 하나는?":
"의사소통 실패는 의료사고의 주요 원인으로 꼽히며 환자안전을 위협할 수 있다.",

"심각한 의료사고 중 상당수는 무엇과 관련이 있는가?":
"많은 의료사고는 정보 전달 부족과 의사소통 오류로 인해 발생한다.",

"능동적 경청의 예는?":
"능동적 경청은 상대방의 말을 집중해서 듣고 고개를 끄덕이는 등 반응을 보이는 것이다.",

"신뢰를 무너뜨리는 행동은?":
"상대방의 말을 들으면서 휴대폰을 보는 행동은 신뢰 형성을 방해한다.",

"Thomas-Kilmann 모델의 경쟁 전략 특징은?":
"경쟁 전략은 자신의 목표 달성을 우선하며 적극성은 높고 협력성은 낮은 특징을 가진다.",

"경쟁 전략이 적절한 상황은?":
"응급상황처럼 빠른 의사결정이 필요한 경우 경쟁 전략이 효과적일 수 있다.",

"경쟁 전략의 단점은?":
"경쟁 전략을 과도하게 사용하면 인간관계 악화와 갈등 심화가 발생할 수 있다.",

"AI 활용 사례로 가장 적절한 것은?":
"스마트워치를 이용한 심방세동 감지는 대표적인 의료 AI 활용 사례이다.",

"AI 윤리 문제에 해당하는 것은?":
"AI 윤리에서는 책임 소재, 개인정보 보호, 알고리즘 편향 등의 문제가 중요하게 다뤄진다.",

"디지털 소외 현상의 설명으로 적절한 것은?":
"고령층이나 정보취약계층은 디지털 의료기술 접근이 어려워 디지털 소외가 발생할 수 있다.",
"건강불평등이 발생하는 가장 큰 원인은?":
"건강불평등은 개인의 노력 차이보다 소득, 교육, 주거환경 등 건강의 사회적 결정요인의 영향을 크게 받는다.",

"생애주기별 누적효과의 설명으로 옳은 것은?":
"어린 시절의 생활환경과 건강상태는 성인기 건강에도 지속적인 영향을 미친다.",

"취약계층 건강문제를 이해할 때 가장 중요한 관점은?":
"취약계층 건강문제는 개인보다 사회구조적 배경과 환경을 함께 고려해야 한다.",

"건강형평성 향상을 위한 접근은?":
"의료 접근성을 높이고 건강 기회의 불평등을 줄이는 것이 중요하다.",

"취약계층 건강관리에서 다직종 협력이 필요한 이유는?":
"건강문제는 의료·복지·경제·환경 등이 복합적으로 작용하므로 다양한 전문가의 협력이 필요하다.",

"지역사회 기반 건강관리의 목표는?":
"환자가 생활하는 지역사회 안에서 지속적이고 통합적인 건강관리를 제공하는 것이다.",

"보건소·복지관·병원이 협력하는 이유는?":
"각 기관이 협력하여 환자를 통합적으로 관리하고 서비스의 연속성을 높이기 위해서이다.",

"케어코디네이터를 가장 적절하게 설명한 것은?":
"케어코디네이터는 환자의 건강관리와 복지서비스를 연결해주는 건강 내비게이터 역할을 수행한다.",

"지역사회 중심 관리 사례는?":
"운동, 영양, 복지 프로그램을 연계하는 것은 대표적인 지역사회 중심 건강관리 사례이다.",

"Community-Based Care의 특징은?":
"질병 치료뿐 아니라 생활 전반을 고려하는 총체적 돌봄을 추구한다.",

"AI의 기본 개념으로 가장 적절한 것은?":
"AI는 데이터를 학습하여 인간처럼 판단하고 문제를 해결할 수 있도록 만든 기술이다.",

"인공지능이라는 용어를 처음 사용한 사람은?":
"존 매카시는 1956년 다트머스 회의에서 인공지능(Artificial Intelligence)이라는 용어를 처음 사용하였다.",

"웨어러블 기기의 활용 사례는?":
"스마트워치의 심방세동 감지 기능은 대표적인 웨어러블 의료기기 활용 사례이다.",

"AI 활용의 대표적 장점은?":
"AI는 실시간 건강 모니터링과 질병 예측을 가능하게 하여 의료서비스 향상에 기여한다.",

"AI 활용 시 가장 중요한 윤리 문제는?":
"AI의 의사결정 결과에 대한 책임 소재는 가장 중요한 윤리적 이슈 중 하나이다.",

"AI 진단 오류 발생 시 중요하게 논의되는 것은?":
"AI 오진 발생 시 책임을 누구에게 물을 것인지가 중요한 논의 주제이다.",

"디지털 소외(Digital Divide)의 설명으로 옳은 것은?":
"고령층과 저소득층은 디지털 기술 접근성이 낮아 의료서비스 이용에 불이익을 받을 수 있다.",

"AI가 대체하기 어려운 의료인의 역할은?":
"공감, 정서적 지지, 윤리적 판단은 AI가 완전히 대체하기 어려운 인간 고유의 역할이다.",

"팀워크 향상과 가장 거리가 먼 것은?":
"사일로 현상은 정보 공유를 방해하므로 팀워크 향상과 반대되는 개념이다.",

"환자 중심 의료환경을 만드는 요소가 아닌 것은?":
"직종 간 정보 독점은 협력을 방해하므로 환자 중심 의료환경 형성에 도움이 되지 않는다.",
"직접 접촉전파의 예는?":
"직접 접촉전파는 감염원과 직접적인 신체 접촉을 통해 병원체가 전파되는 것으로 환자와의 악수가 대표적인 예이다.",

"감염경로 차단 방법으로 가장 기본적인 것은?":
"손위생은 감염관리에서 가장 기본적이고 효과적인 감염경로 차단 방법이다.",

"감염감시 대상 미생물이 아닌 것은?":
"MRSA, VRE, CRE는 대표적인 감염감시 대상 다제내성균이며 HIV는 일반적인 병원 감시균으로 분류되지 않는다.",

"표준주의에 대한 설명으로 옳은 것은?":
"표준주의는 감염 여부와 관계없이 모든 환자에게 적용하는 기본 감염예방 수칙이다.",

"감염관리에서 다직종 협력이 중요한 이유는?":
"감염관리는 의료진 전체가 함께 수행해야 효과적이므로 다직종 협력이 중요하다.",

"전문직 간 의사소통의 가장 큰 목적은?":
"전문직 간 의사소통의 궁극적인 목적은 환자안전 향상과 의료서비스 질 개선이다.",

"효과적인 의사소통 요소가 아닌 것은?":
"경청, 공감, 피드백은 효과적인 의사소통 요소이며 독단적 지시는 이에 해당하지 않는다.",

"비언어적 의사소통에 해당하는 것은?":
"표정, 자세, 몸짓, 시선처리 등은 대표적인 비언어적 의사소통 수단이다.",

"전문직 간 신뢰 형성에 가장 필요한 것은?":
"상대방의 의견을 존중하고 경청하는 태도가 신뢰 형성의 핵심이다.",

"보건의료팀워크의 최종 목적은?":
"보건의료팀워크의 궁극적인 목표는 환자 중심의 안전하고 질 높은 의료서비스 제공이다.",

"사일로(Silo) 현상이란?":
"사일로 현상은 부서나 직종이 서로 고립되어 정보 공유와 협력이 부족한 상태를 의미한다.",

"사일로 현상의 위험성은?":
"사일로 현상은 정보 전달 오류와 의사소통 단절을 초래하여 의료오류 증가의 원인이 된다.",

"효과적인 팀의 특징은?":
"효과적인 팀은 상호존중과 협력을 바탕으로 공동 목표를 달성한다.",

"팀워크 향상의 결과로 적절한 것은?":
"좋은 팀워크는 치료의 질 향상, 환자 만족도 증가, 의료오류 감소를 가져온다.",

"환자 중심 팀워크가 필요한 이유는?":
"다양한 전문직이 협력하여 통합적이고 연속적인 치료를 제공하기 위해 필요하다.",

"의료관련감염(HAI)에 포함되지 않는 것은?":
"의료관련감염은 의료행위와 관련된 감염을 의미하며 일반적인 지역사회 감기는 포함되지 않는다.",

"내인성 감염의 예는?":
"환자 자신의 정상균총이 면역저하 등으로 이상 증식하여 발생하는 감염을 내인성 감염이라 한다.",

"감염감시 대상 미생물이 아닌 것은?":
"MRSA, VRE, CRE는 주요 감시균이며 HBV는 일반적인 다제내성균 감시 대상과 구분된다.",

"접촉전파의 예로 적절한 것은?":
"악수는 사람 간 직접 접촉을 통한 대표적인 접촉전파 사례이다.",

"표준주의 적용 대상은?":
"표준주의는 감염 여부와 관계없이 모든 환자에게 적용한다.",

"손위생의 주된 목적은?":
"손위생은 의료기관 내 병원체 전파를 차단하여 감염 발생을 예방하는 가장 기본적인 감염관리 방법이다.",

"의료사고 예방을 위해 가장 중요한 것은?":
"정확한 정보 공유와 원활한 의사소통은 의료사고 예방의 핵심 요소이다.",

"능동적 경청에 해당하지 않는 것은?":
"휴대폰을 확인하는 행동은 상대방의 말에 집중하지 않는 것으로 능동적 경청에 해당하지 않는다.",

"전문직 간 의사소통 부족 시 발생 가능한 결과는?":
"의사소통 부족은 정보 누락과 협력 저하를 초래하여 의료오류를 증가시킬 수 있다.",

"사일로 현상의 결과는?":
"사일로 현상은 부서 간 정보 공유 부족과 의사소통 단절을 초래한다.",

"효과적인 팀워크의 핵심 요소는?":
"상호존중은 효과적인 팀워크 형성의 가장 중요한 기본 요소이다.",

"갈등관리에서 경쟁 전략의 특징은?":
"경쟁 전략은 자신의 목표 달성을 우선하며 적극성은 높고 협력성은 낮은 특징이 있다.",

"응급상황에서 경쟁 전략이 필요한 이유는?":
"응급상황에서는 신속한 판단과 의사결정이 중요하기 때문에 경쟁 전략이 사용될 수 있다.",

"경쟁 전략을 과도하게 사용할 경우 발생하는 문제는?":
"지나친 경쟁은 갈등 심화와 인간관계 악화를 초래할 수 있다.",

"지역사회 중심 건강관리의 특징은?":
"현대 건강관리는 치료 중심에서 예방 및 통합관리 중심으로 변화하고 있다.",

"건강의 사회적 결정요인(SDH)에 해당하는 것은?":
"소득은 건강수준에 영향을 주는 대표적인 건강의 사회적 결정요인이다.",

"취약계층 건강문제의 특징은?":
"취약계층 건강문제는 경제·사회·환경적 요인이 복합적으로 작용한다.",

"지역사회 기반 건강관리의 목표는?":
"환자가 생활하는 지역사회 안에서 지속적이고 통합적인 건강관리를 제공하는 것이다.",

"보건소·복지관·병원이 협력하는 이유는?":
"환자의 건강문제를 통합적으로 관리하고 서비스 연속성을 높이기 위해 협력한다.",

"케어코디네이터를 가장 적절하게 설명한 것은?":
"케어코디네이터는 의료·복지 서비스를 연계하고 조정하는 건강관리 안내자 역할을 수행한다.",

"지역사회 중심 관리 사례는?":
"운동, 영양, 복지서비스를 연계하는 것은 대표적인 지역사회 중심 건강관리 사례이다.",

"AI의 기본 개념으로 가장 적절한 것은?":
"AI는 데이터를 학습하여 인간처럼 판단하고 문제를 해결할 수 있도록 만든 기술이다.",

"인공지능이라는 용어를 처음 사용한 사람은?":
"존 매카시는 1956년 다트머스 회의에서 인공지능이라는 용어를 처음 사용하였다.",

"웨어러블 기기의 활용 사례는?":
"스마트워치의 심방세동 감지 기능은 대표적인 의료용 웨어러블 기술 활용 사례이다.",

"AI 활용의 대표적 장점은?":
"AI는 실시간 건강 모니터링과 질병 예측을 통해 의료서비스의 효율성을 향상시킨다.",

"AI 활용 시 가장 중요한 윤리 문제는?":
"AI의 판단 결과에 대한 책임 소재는 가장 중요한 윤리적 문제 중 하나이다.",

"AI 진단 오류 발생 시 중요하게 논의되는 것은?":
"AI 오진 발생 시 누가 책임을 질 것인지에 대한 문제가 중요하게 논의된다.",

"디지털 소외(Digital Divide)의 설명으로 옳은 것은?":
"고령층과 저소득층은 디지털 기술 접근성이 낮아 의료서비스 이용에 어려움을 겪을 수 있다.",

"AI가 대체하기 어려운 의료인의 역할은?":
"공감, 정서적 지지, 윤리적 판단은 AI가 완전히 대체하기 어려운 인간 고유의 영역이다.",

"팀워크 향상과 가장 거리가 먼 것은?":
"사일로 현상은 정보 공유를 방해하므로 팀워크 향상과 반대되는 개념이다.",

"환자 중심 의료환경을 만드는 요소가 아닌 것은?":
"직종 간 정보 독점은 협력을 저해하므로 환자 중심 의료환경 조성에 도움이 되지 않는다."
    };
    
const allQuestions = [
{
chapter:"감염관리",
question:"의료관련감염(HAI)에 대한 설명으로 가장 옳은 것은?",
choices:[
"입원환자에게만 발생한다",
"의료기관 내 의료행위와 관련된 감염이다",
"외래환자는 포함되지 않는다",
"환자만 포함하고 의료진은 포함하지 않는다"
],
answer:1
},

{
chapter:"감염관리",
question:"의료관련감염 발생 빈도가 가장 높은 장소는?",
choices:[
"응급실",
"수술실",
"중환자실",
"원무과"
],
answer:2
},

{
chapter:"감염관리",
question:"내인성 감염에 해당하는 것은?",
choices:[
"의료진 손을 통한 감염",
"오염된 수술도구 감염",
"정상균총의 이상 증식",
"공기 중 병원체 감염"
],
answer:2
},

{
chapter:"감염관리",
question:"외인성 감염 사례는?",
choices:[
"정상균총 증식",
"면역력 증가",
"오염된 카테터 사용",
"체내 잠복균 활성화"
],
answer:2
},

{
chapter:"감염관리",
question:"감염 전파 경로가 아닌 것은?",
choices:[
"접촉전파",
"비말전파",
"공기전파",
"유전전파"
],
answer:3
},

{
chapter:"감염관리",
question:"직접 접촉전파의 예는?",
choices:[
"환자와 악수",
"오염된 침대 사용",
"오염된 청진기 사용",
"문고리 접촉"
],
answer:0
},

{
chapter:"감염관리",
question:"감염경로 차단 방법으로 가장 기본적인 것은?",
choices:[
"항생제 사용",
"손위생",
"예방접종",
"격리병실 확대"
],
answer:1
},

{
chapter:"감염관리",
question:"감염감시 대상 미생물이 아닌 것은?",
choices:[
"MRSA",
"VRE",
"CRE",
"HIV"
],
answer:3
},

{
chapter:"감염관리",
question:"표준주의에 대한 설명으로 옳은 것은?",
choices:[
"감염환자만 적용",
"모든 환자에게 적용",
"의사만 적용",
"입원환자만 적용"
],
answer:1
},

{
chapter:"감염관리",
question:"감염관리에서 다직종 협력이 중요한 이유는?",
choices:[
"업무 감소",
"각 직종이 감염관리 일부 담당",
"의료비 절감",
"환자 수 증가"
],
answer:1
},

{
chapter:"의사소통",
question:"전문직 간 의사소통의 가장 큰 목적은?",
choices:[
"권한 강화",
"환자 안전 증진",
"경쟁 촉진",
"직종 구분"
],
answer:1
},

{
chapter:"의사소통",
question:"효과적인 의사소통 요소가 아닌 것은?",
choices:[
"경청",
"공감",
"피드백",
"독단적 지시"
],
answer:3
},

{
chapter:"의사소통",
question:"비언어적 의사소통에 해당하는 것은?",
choices:[
"표정",
"보고서",
"전자의무기록",
"문자메시지"
],
answer:0
},

{
chapter:"의사소통",
question:"전문직 간 신뢰 형성에 가장 필요한 것은?",
choices:[
"침묵",
"경쟁",
"경청",
"지시"
],
answer:2
},

{
chapter:"팀워크",
question:"보건의료팀워크의 최종 목적은?",
choices:[
"직종 경쟁",
"환자 중심 돌봄",
"역할 분리",
"권한 강화"
],
answer:1
},

{
chapter:"팀워크",
question:"사일로(Silo) 현상이란?",
choices:[
"정보 공유 활성화",
"직종 간 협력 강화",
"전문영역에 고립된 상태",
"다학제 진료"
],
answer:2
},

{
chapter:"팀워크",
question:"사일로 현상의 위험성은?",
choices:[
"환자 만족 증가",
"의료오류 감소",
"의사소통 활성화",
"의료오류 증가"
],
answer:3
},

{
chapter:"팀워크",
question:"효과적인 팀의 특징은?",
choices:[
"상호존중",
"정보 독점",
"역할 무시",
"경쟁 우선"
],
answer:0
},

{
chapter:"팀워크",
question:"팀워크 향상의 결과로 적절한 것은?",
choices:[
"오류 증가",
"만족도 감소",
"치료 질 향상",
"갈등 증가"
],
answer:2
},

{
chapter:"팀워크",
question:"환자 중심 팀워크가 필요한 이유는?",
choices:[
"업무 단순화",
"통합적 치료 제공",
"직종 축소",
"비용 증가"
],
answer:1
},
{
chapter:"지역사회와복지",
question:"AIP(Aging In Place)의 의미는?",
choices:[
"요양병원 생활",
"해외 이주",
"살던 지역사회에서 계속 생활",
"자녀와만 동거"
],
answer:2
},

{
chapter:"지역사회와복지",
question:"지역사회 건강관리 패러다임 변화로 옳은 것은?",
choices:[
"예방 → 치료",
"지역사회 → 병원",
"치료 → 예방 및 통합관리",
"만성질환 → 급성질환"
],
answer:2
},

{
chapter:"지역사회와복지",
question:"Community-Based 관리의 특징은?",
choices:[
"완치만 목표",
"병원 내부 중심",
"총체적 돌봄 지향",
"입원 중심"
],
answer:2
},

{
chapter:"지역사회와복지",
question:"지역사회 건강관리 예시로 적절한 것은?",
choices:[
"약만 처방",
"병원 방문 금지",
"영양상담과 운동프로그램 연계",
"응급실만 이용"
],
answer:2
},

{
chapter:"지역사회와복지",
question:"케어코디네이터의 역할은?",
choices:[
"수술 집도",
"약 조제",
"서비스 연계 및 조정",
"영상 판독"
],
answer:2
},

{
chapter:"건강형평성",
question:"건강형평성의 의미는?",
choices:[
"모든 사람에게 같은 결과 제공",
"건강기회의 공정한 보장",
"의료비 증가",
"병원 수 증가"
],
answer:1
},

{
chapter:"건강형평성",
question:"건강의 사회적 결정요인(SDH)에 해당하지 않는 것은?",
choices:[
"교육수준",
"소득",
"주거환경",
"혈액형"
],
answer:3
},

{
chapter:"건강형평성",
question:"취약계층의 설명으로 가장 적절한 것은?",
choices:[
"경제적으로 어려운 사람만 의미",
"사회적 결정요인으로 건강위험이 높은 집단",
"노인만 포함",
"장애인만 포함"
],
answer:1
},

{
chapter:"건강형평성",
question:"건강불평등의 결과는?",
choices:[
"조기사망률 감소",
"만성질환 감소",
"치료 중단 증가",
"의료비 감소"
],
answer:2
},

{
chapter:"건강형평성",
question:"건강형평성 수업에서 강조하는 관점은?",
choices:[
"개인 책임만 강조",
"게으름 문제",
"사회구조적 배경 고려",
"유전만 고려"
],
answer:2
},

{
chapter:"의사소통",
question:"의료사고의 주요 원인 중 하나는?",
choices:[
"의사소통 실패",
"건물 노후화",
"주차장 부족",
"진료과 증가"
],
answer:0
},

{
chapter:"의사소통",
question:"심각한 의료사고 중 상당수는 무엇과 관련이 있는가?",
choices:[
"장비 색상",
"정보누락과 소통오류",
"병원 위치",
"환자 연령"
],
answer:1
},

{
chapter:"의사소통",
question:"능동적 경청의 예는?",
choices:[
"휴대폰 보기",
"시선 회피",
"고개 끄덕임",
"다른 업무 수행"
],
answer:2
},

{
chapter:"의사소통",
question:"신뢰를 무너뜨리는 행동은?",
choices:[
"경청",
"시선 맞추기",
"공감 표현",
"휴대폰 보며 듣기"
],
answer:3
},

{
chapter:"팀워크",
question:"Thomas-Kilmann 모델의 경쟁 전략 특징은?",
choices:[
"높은 협력성",
"높은 적극성, 낮은 협력성",
"낮은 적극성",
"상호양보"
],
answer:1
},

{
chapter:"팀워크",
question:"경쟁 전략이 적절한 상황은?",
choices:[
"응급상황",
"친목 모임",
"회식",
"장기 협력관계"
],
answer:0
},

{
chapter:"팀워크",
question:"경쟁 전략의 단점은?",
choices:[
"신속성 부족",
"관계 악화 가능성",
"의사결정 지연",
"책임 불분명"
],
answer:1
},

{
chapter:"AI",
question:"AI 활용 사례로 가장 적절한 것은?",
choices:[
"스마트워치 심방세동 감지",
"수기차트 확대",
"팩스 사용 증가",
"필름 보관 확대"
],
answer:0
},

{
chapter:"AI",
question:"AI 윤리 문제에 해당하는 것은?",
choices:[
"책임소재",
"해상도 증가",
"CPU 속도",
"모니터 크기"
],
answer:0
},

{
chapter:"AI",
question:"디지털 소외 현상의 설명으로 적절한 것은?",
choices:[
"모든 사람이 동일하게 AI 활용",
"고령층의 의료기술 접근 어려움",
"의료접근성 향상만 발생",
"디지털 기술과 무관"
],
answer:1
},
{
chapter:"감염관리",
question:"의료관련감염(HAI)에 포함되지 않는 것은?",
choices:[
"입원 중 발생 감염",
"외래진료 관련 감염",
"의료종사자 감염",
"지역사회 일반 감기"
],
answer:3
},

{
chapter:"감염관리",
question:"내인성 감염의 예는?",
choices:[
"오염된 내시경",
"의료진 손",
"정상균총 이상 증식",
"오염된 주사기"
],
answer:2
},

{
chapter:"감염관리",
question:"감염감시 대상 미생물이 아닌 것은?",
choices:[
"MRSA",
"VRE",
"CRE",
"HBV"
],
answer:3
},

{
chapter:"감염관리",
question:"접촉전파의 예로 적절한 것은?",
choices:[
"결핵",
"홍역",
"악수",
"수두"
],
answer:2
},

{
chapter:"감염관리",
question:"표준주의 적용 대상은?",
choices:[
"감염환자만",
"중환자만",
"모든 환자",
"수술환자만"
],
answer:2
},

{
chapter:"감염관리",
question:"손위생의 주된 목적은?",
choices:[
"체온 유지",
"감염 전파 차단",
"혈압 감소",
"혈당 조절"
],
answer:1
},

{
chapter:"의사소통",
question:"의료사고 예방을 위해 가장 중요한 것은?",
choices:[
"정보 공유",
"권한 강화",
"직종 구분",
"업무 분리"
],
answer:0
},

{
chapter:"의사소통",
question:"능동적 경청에 해당하지 않는 것은?",
choices:[
"고개 끄덕임",
"공감 표현",
"시선 맞추기",
"휴대폰 확인"
],
answer:3
},

{
chapter:"의사소통",
question:"비언어적 의사소통의 예는?",
choices:[
"메일",
"문자",
"표정",
"진료기록"
],
answer:2
},

{
chapter:"의사소통",
question:"전문직 간 의사소통 부족 시 발생 가능한 결과는?",
choices:[
"환자 안전 향상",
"의료오류 증가",
"치료효과 증가",
"협력 증진"
],
answer:1
},

{
chapter:"팀워크",
question:"사일로 현상의 결과는?",
choices:[
"정보공유 활성화",
"협력 증진",
"의사소통 단절",
"치료 향상"
],
answer:2
},

{
chapter:"팀워크",
question:"효과적인 팀워크의 핵심 요소는?",
choices:[
"상호존중",
"독점",
"경쟁",
"폐쇄성"
],
answer:0
},

{
chapter:"팀워크",
question:"갈등관리에서 경쟁 전략의 특징은?",
choices:[
"Win-Win",
"적극성 높음",
"협력성 높음",
"양보 중심"
],
answer:1
},

{
chapter:"팀워크",
question:"응급상황에서 경쟁 전략이 필요한 이유는?",
choices:[
"토론 확대",
"신속한 의사결정",
"관계 유지",
"감정 교류"
],
answer:1
},

{
chapter:"팀워크",
question:"경쟁 전략을 과도하게 사용할 경우 발생하는 문제는?",
choices:[
"관계 악화",
"협력 증가",
"신뢰 증가",
"만족도 향상"
],
answer:0
},

{
chapter:"지역사회와복지",
question:"지역사회 중심 건강관리의 특징은?",
choices:[
"급성질환 중심",
"병원 중심",
"예방 및 통합관리",
"수술 중심"
],
answer:2
},

{
chapter:"지역사회와복지",
question:"AIP(Aging In Place)의 의미는?",
choices:[
"병원 정착",
"요양시설 입소",
"지역사회에서 노후생활",
"해외 이주"
],
answer:2
},

{
chapter:"지역사회와복지",
question:"케어코디네이터의 역할은?",
choices:[
"수술",
"조제",
"서비스 연결 및 조정",
"영상판독"
],
answer:2
},

{
chapter:"건강형평성",
question:"건강의 사회적 결정요인(SDH)에 해당하는 것은?",
choices:[
"소득",
"혈액형",
"홍채색",
"손금"
],
answer:0
},

{
chapter:"건강형평성",
question:"취약계층 건강문제의 특징은?",
choices:[
"단일 원인",
"복합적 원인",
"유전만 영향",
"의료만 영향"
],
answer:1
},
{
chapter:"건강형평성",
question:"건강불평등이 발생하는 가장 큰 원인은?",
choices:[
"혈액형 차이",
"건강의 사회적 결정요인",
"눈 색깔",
"유전자만의 영향"
],
answer:1
},

{
chapter:"건강형평성",
question:"생애주기별 누적효과의 설명으로 옳은 것은?",
choices:[
"노년기 건강은 노년기에만 결정된다",
"태아기 경험은 건강과 무관하다",
"어린 시절 환경은 성인기 건강에 영향을 준다",
"건강은 유전으로만 결정된다"
],
answer:2
},

{
chapter:"건강형평성",
question:"취약계층 건강문제를 이해할 때 가장 중요한 관점은?",
choices:[
"개인의 의지 부족",
"사회구조적 배경",
"성격 문제",
"노력 부족"
],
answer:1
},

{
chapter:"건강형평성",
question:"건강형평성 향상을 위한 접근은?",
choices:[
"의료서비스 축소",
"의료 접근성 향상",
"정보 제한",
"비용 증가"
],
answer:1
},

{
chapter:"건강형평성",
question:"취약계층 건강관리에서 다직종 협력이 필요한 이유는?",
choices:[
"문제의 복합성",
"업무 감소",
"인력 부족",
"병원 확대"
],
answer:0
},

{
chapter:"지역사회와복지",
question:"지역사회 기반 건강관리의 목표는?",
choices:[
"입원환자 증가",
"생활현장에서 건강관리",
"응급실 확대",
"병상 수 증가"
],
answer:1
},

{
chapter:"지역사회와복지",
question:"보건소·복지관·병원이 협력하는 이유는?",
choices:[
"비용 증가",
"환자 통합관리",
"경쟁 강화",
"역할 축소"
],
answer:1
},

{
chapter:"지역사회와복지",
question:"케어코디네이터를 가장 적절하게 설명한 것은?",
choices:[
"진단 전문가",
"건강 내비게이터",
"수술 담당자",
"영상 판독자"
],
answer:1
},

{
chapter:"지역사회와복지",
question:"지역사회 중심 관리 사례는?",
choices:[
"퇴원 후 관리 없음",
"약 처방만 실시",
"운동·영양·복지 서비스 연계",
"응급실 이용 권장"
],
answer:2
},

{
chapter:"지역사회와복지",
question:"Community-Based Care의 특징은?",
choices:[
"치료 후 종료",
"총체적 돌봄",
"질환 중심",
"병원 중심"
],
answer:1
},

{
chapter:"AI",
question:"AI의 기본 개념으로 가장 적절한 것은?",
choices:[
"계산기 프로그램",
"인간처럼 학습하고 판단하는 기술",
"데이터 저장장치",
"인터넷 서비스"
],
answer:1
},

{
chapter:"AI",
question:"인공지능이라는 용어를 처음 사용한 사람은?",
choices:[
"튜링",
"힌튼",
"존 매카시",
"로젠블랫"
],
answer:2
},

{
chapter:"AI",
question:"웨어러블 기기의 활용 사례는?",
choices:[
"혈액형 변경",
"심방세동 감지",
"유전자 수정",
"장기 이식"
],
answer:1
},

{
chapter:"AI",
question:"AI 활용의 대표적 장점은?",
choices:[
"실시간 건강 모니터링",
"의료인 제거",
"병원 폐쇄",
"진료 중단"
],
answer:0
},

{
chapter:"AI",
question:"AI 활용 시 가장 중요한 윤리 문제는?",
choices:[
"책임 소재",
"화면 크기",
"전력 사용량",
"인터넷 속도"
],
answer:0
},

{
chapter:"AI",
question:"AI 진단 오류 발생 시 중요하게 논의되는 것은?",
choices:[
"병원 건물",
"책임 소재",
"주차 공간",
"병상 수"
],
answer:1
},

{
chapter:"AI",
question:"디지털 소외(Digital Divide)의 설명으로 옳은 것은?",
choices:[
"모두가 동일하게 기술 활용",
"고령층·저소득층 접근 제한",
"의료 접근성 향상만 발생",
"인터넷 사용 증가"
],
answer:1
},

{
chapter:"AI",
question:"AI가 대체하기 어려운 의료인의 역할은?",
choices:[
"데이터 저장",
"정서적 지지와 공감",
"계산",
"검색"
],
answer:1
},

{
chapter:"종합",
question:"팀워크 향상과 가장 거리가 먼 것은?",
choices:[
"정보 공유",
"상호 존중",
"사일로 현상",
"협력"
],
answer:2
},

{
chapter:"종합",
question:"환자 중심 의료환경을 만드는 요소가 아닌 것은?",
choices:[
"의사소통",
"다직종 협력",
"감염관리",
"직종 간 정보 독점"
],
answer:3
}
];

// =====================
// 랜덤 섞기
// =====================

function shuffle(array){

for(
let i=array.length-1;
i>0;
i--
){

const j =
Math.floor(
Math.random()*(i+1)
);

[array[i],array[j]]
=
[array[j],array[i]];

}

return array;

}

// =====================
// 시험 생성
// =====================

function createExam(){

const copy =
[...allQuestions];

shuffle(copy);

examQuestions =
copy.slice(0,20);

currentQuestion = 0;

userAnswers =
new Array(
examQuestions.length
);

renderQuestion();

}

// =====================
// 문제 출력
// =====================

function renderQuestion(){

if(
examQuestions.length===0
){

return;

}

const q =
examQuestions[
currentQuestion
];

answered = false;

document
.getElementById("chapter")
.innerText =
q.chapter;

document
.getElementById("question")
.innerText =
q.question;

document
.getElementById("progressText")
.innerText =
`문제 ${currentQuestion+1}
/
${examQuestions.length}`;

const choicesDiv =
document.getElementById(
"choices"
);

choicesDiv.innerHTML = "";

q.choices.forEach(
    (choice,index)=>{
    
    const div =
    document.createElement(
    "div"
    );
    
    div.className =
    "choice";
    
    if(
    userAnswers[currentQuestion]
    ===index
    ){
    div.classList.add(
    "selected"
    );
    }
    
    div.innerHTML =
    `
    ${index+1}.
    ${choice}
    `;
    
    div.onclick = ()=>{
    checkAnswer(index);
    };
    
    choicesDiv.appendChild(
    div
    );
    
    }
    );
document
.getElementById("feedback")
.classList.add("hidden");

document
.getElementById("explanation")
.classList.add("hidden");

updateProgressBar();

}

// =====================
// 진행률
// =====================

function updateProgressBar(){

if(
examQuestions.length===0
){

return;

}

const percent =

(
(currentQuestion+1)
/
examQuestions.length
)

*100;

document
.getElementById(
"progressBar"
)
.style.width =
percent+"%";

}

// =====================
// 이전
// =====================

document
.getElementById(
"prevBtn"
)
.addEventListener(
"click",
()=>{

if(
currentQuestion>0
){

currentQuestion--;

renderQuestion();

}

}
);

// =====================
// 다음
// =====================

document
.getElementById(
"nextBtn"
)
.addEventListener(
"click",
()=>{

if(
currentQuestion
<
examQuestions.length-1
){

currentQuestion++;

renderQuestion();

}

}
);

// =====================
// 시험 시작
// =====================

document
.getElementById(
"startExamBtn"
)
.addEventListener(
"click",
createExam
);

// =====================
// 제출
// =====================

document
.getElementById(
"submitBtn"
)
.addEventListener(
"click",
submitExam
);

function submitExam(){

let correct = 0;

let wrongList = [];

examQuestions.forEach(

(q,index)=>{

if(
userAnswers[index]
===
q.answer
){

correct++;

}else{

wrongList.push(q);

}

}

);

saveWrongQuestions(
wrongList
);

updateChapterStats();

const score =
Math.round(

(correct
/
examQuestions.length)

*100

);

showResult(
score,
correct
);

}

// =====================
// 결과창
// =====================

function showResult(
score,
correct
){

document
.getElementById(
"resultModal"
)
.classList.remove(
"hidden"
);

document
.getElementById(
"score"
)
.innerHTML =

`
점수 :
${score}점

<br><br>

정답 :
${correct}

<br>

오답 :
${examQuestions.length-correct}
`;

document
.getElementById(
"chapterResult"
)
.innerHTML =
getChapterResultHTML();

}

// =====================
// 챕터 분석
// =====================

function updateChapterStats(){

examQuestions.forEach(

(q,index)=>{

if(
!chapterStats[
q.chapter
]
){

chapterStats[
q.chapter
]
=
{
correct:0,
total:0
};

}

chapterStats[
q.chapter
].total++;

if(
userAnswers[index]
===
q.answer
){

chapterStats[
q.chapter
].correct++;

}

}

);

localStorage.setItem(

"chapterStats",

JSON.stringify(
chapterStats
)

);

}

function getChapterResultHTML(){

let html = "";

for(
let chapter
in
chapterStats
){

const data =
chapterStats[
chapter
];

const rate =
Math.round(

(data.correct
/
data.total)

*100

);

html +=

`
<div>

${chapter}
:
${rate}%

</div>
`;

}

return html;

}

// =====================
// 오답 저장
// =====================

function saveWrongQuestions(
list
){

let saved =

JSON.parse(

localStorage.getItem(
"wrongQuestions"
)

||
"[]"

);

list.forEach(

q=>{

const exists =

saved.find(

item=>

item.question
===
q.question

);

if(
!exists
){

saved.push(q);

}

}

);

localStorage.setItem(

"wrongQuestions",

JSON.stringify(
saved
)

);

}

// =====================
// 오답노트 모드
// =====================

function startWrongMode(){

const wrong =

JSON.parse(

localStorage.getItem(
"wrongQuestions"
)

||
"[]"

);

if(
wrong.length===0
){

alert(
"오답노트가 없습니다."
);

return;

}

shuffle(wrong);

examQuestions =

wrong.slice(

0,

Math.min(
20,
wrong.length
)

);

currentQuestion = 0;

userAnswers = [];

renderQuestion();

}

// =====================
// 약점공략
// =====================

function startWeakMode(){

const weakChapters =
[];

for(
let chapter
in
chapterStats
){

const data =
chapterStats[
chapter
];

const rate =
Math.round(

(data.correct
/
data.total)

*100

);

if(
rate<70
){

weakChapters.push(
chapter
);

}

}

const weakQuestions =

allQuestions.filter(

q=>

weakChapters.includes(
q.chapter
)

);

shuffle(
weakQuestions
);

examQuestions =

weakQuestions.slice(
0,
20
);

currentQuestion = 0;

userAnswers = [];

renderQuestion();

}

// =====================
// 버튼 연결
// =====================

document
.getElementById(
"weakBtn"
)
.addEventListener(
"click",
startWeakMode
);

document
.getElementById(
"wrongBtn"
)
.addEventListener(
"click",
startWrongMode
);

// =====================
// 다시시험
// =====================
function checkAnswer(selected){
    if(answered){
        return;
    }

    answered = true;

    const q =
    examQuestions[currentQuestion];
    
    userAnswers[currentQuestion]
    =
    selected;
    
    const feedback =
    document.getElementById(
    "feedback"
    );
    
    const explanation =
    document.getElementById(
    "explanation"
    );
    
    feedback.classList.remove(
    "hidden"
    );
    
    explanation.classList.remove(
    "hidden"
    );
    
    if(
    selected===q.answer
    ){
    
    feedback.className =
    "feedback correct";
    
    feedback.innerHTML =
`⭕ 정답<br>
정답 : ${q.answer+1}번
(${q.choices[q.answer]})`;
    }
    else{
    
    feedback.className =
    "feedback wrong";
    
    feedback.innerHTML =
    `❌ 오답<br>
    정답 : ${q.answer+1}번
    (${q.choices[q.answer]})`;
    }
    
    explanation.innerHTML =
    `
    <b>해설</b><br><br>
    ${explanations[q.question] || "해설 준비중"}
    `;
    }    

document
.getElementById(
"restartBtn"
)
.addEventListener(
"click",
()=>{

document
.getElementById(
"resultModal"
)
.classList.add(
"hidden"
);

createExam();

}
);