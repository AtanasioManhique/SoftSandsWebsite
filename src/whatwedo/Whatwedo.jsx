import WhatWeDoOpening from "./WhatWeDoOpening";
import ProblemBlock from "./ProblemBlock";
import ServiceBlock from "./ServiceBlock";
import ForWhoBlock from "./ForWhoBlock";
import WhySoftSandsBlock from "./WhySoftSandsBlock";


export default function WhatWeDo() {
  return (
    <div>
      <WhatWeDoOpening />
      <ProblemBlock />
      <ServiceBlock />
      <ForWhoBlock />
      <WhySoftSandsBlock />
    </div>
  );
}