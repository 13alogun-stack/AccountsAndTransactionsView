import svgPaths from "./svg-x7gn6y99v6";

function Title({ onClose }: { onClose: () => void }) {
  return (
    <div className="content-stretch flex gap-[10px] items-start justify-end relative shrink-0 w-full" data-name="Title">
      <p className="[word-break:break-word] flex-[1_0_0] font-semibold leading-[1.35] min-w-px not-italic relative text-[#333] text-[20px]">Pay your credit card</p>
      <button onClick={onClose} className="relative shrink-0 size-[24px]" data-name="Actions">
        <div className="absolute inset-1/4" data-name="Union">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9999 11.9992">
            <path d={svgPaths.pe233380} fill="#666666" id="Union" />
          </svg>
        </div>
      </button>
    </div>
  );
}

function Container({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-[#fafafa] min-w-[272px] relative rounded-[12px] shrink-0 w-full" data-name="Selectable-Tile">
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col items-start min-w-[inherit] p-[16px] relative size-full gap-2">
        <p className="font-semibold leading-[1.4] text-[#333] text-[16px]">{title}</p>
        <p className="font-normal leading-[1.4] text-[#333] text-[16px]">{description}</p>
      </div>
    </div>
  );
}

export default function PcmaTrue({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start p-[24px] relative rounded-t-[20px] size-full" data-name="PCMA=true">
      {/* Grab bar */}
      <div className="w-full flex justify-center -mt-2 mb-2">
        <div className="w-10 h-1 bg-[#ccc] rounded-full" />
      </div>

      <Title onClose={onClose} />

      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
        <Container
          title="In-app transfer"
          description="Transfer money from your PCMA"
        />
        <Container
          title="Pay with points"
          description="Use your PC Optimum points"
        />
        <Container
          title="Setup autopay"
          description="Set up recurring payments"
        />
        <Container
          title="External bank account transfer"
          description="Pay using another bank account"
        />
      </div>

      <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0 w-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <div className="h-[23.098px] relative w-[38px]" data-name="Toggle">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[23.098px] left-[calc(50%-0.37px)] top-[calc(50%+0.08px)] w-[38px]" data-name="Background">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 23.0982">
                  <path clipRule="evenodd" d={svgPaths.p2ee680b0} fill="#6C41A9" fillRule="evenodd" id="Background" />
                </svg>
              </div>
              <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-8.06px)] size-[20.118px] top-[calc(50%+0.08px)]" data-name="Knob">
                <div className="absolute inset-[-18.52%_-29.63%_-40.74%_-29.63%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.0392 32.0392">
                    <g filter="url(#filter0_dd_5_9353)" id="Knob">
                      <path clipRule="evenodd" d={svgPaths.p3107b400} fill="white" fillRule="evenodd" />
                    </g>
                    <defs>
                      <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="32.0392" id="filter0_dd_5_9353" width="32.0392" x="0" y="0">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset dy="2.23529" />
                        <feGaussianBlur stdDeviation="0.372549" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                        <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_5_9353" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset dy="2.23529" />
                        <feGaussianBlur stdDeviation="2.98039" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                        <feBlend in2="effect1_dropShadow_5_9353" mode="normal" result="effect2_dropShadow_5_9353" />
                        <feBlend in="SourceGraphic" in2="effect2_dropShadow_5_9353" mode="normal" result="shape" />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-semibold leading-[1.4] min-w-px not-italic relative text-[#333] text-[16px]">Choose method every time</p>
      </div>

      <button className="bg-[#3d1952] drop-shadow-[2px_2px_5px_rgba(0,0,0,0.07)] h-[40px] relative rounded-[100px] shrink-0 w-full" data-name="Lock card button variations">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[24px] py-[5px] relative size-full">
            <p className="[word-break:break-word] font-semibold leading-[1.35] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Next</p>
          </div>
        </div>
      </button>
    </div>
  );
}
