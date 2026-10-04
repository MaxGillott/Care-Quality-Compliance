/** Original line studies. Decorative, not professional or regulatory marks. */
export function PracticeArtwork({ index = 0 }: { index?: number }) {
  return (
    <svg
      className="practice-artwork"
      viewBox="0 0 400 340"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {index === 0 && (
        <>
          <g className="art-plane art-plane-back">
            <path d="M105 67H307V247H105Z" fill="var(--art-fill)" />
            <path d="M105 67H307V247H105Z" />
          </g>
          <g className="art-plane art-plane-front">
            <path d="M75 107H277V287H75Z" fill="var(--art-paper)" />
            <path d="M75 107H277V287H75Z" />
            <path
              d="M111 144H240M111 178H207M111 212H227"
              className="art-detail"
            />
          </g>
          <path d="M194 112V62H324V186H275" className="art-accent" />
          <circle cx="194" cy="112" r="8" fill="currentColor" stroke="none" />
        </>
      )}
      {index === 1 && (
        <>
          <g className="art-plane art-plane-back">
            <rect
              x="63"
              y="49"
              width="266"
              height="245"
              rx="2"
              fill="var(--art-fill)"
            />
          </g>
          <g className="art-plane art-plane-front">
            <path
              d="M124 118V92H153M247 92H276V118M276 226V252H247M153 252H124V226"
              className="art-accent"
            />
            <rect
              x="153"
              y="122"
              width="94"
              height="100"
              fill="var(--art-paper)"
            />
            <path d="M178 163H222M178 180H212" className="art-detail" />
          </g>
          <path
            d="M63 170H106M294 170H329M200 49V73M200 271V294"
            className="art-detail"
          />
        </>
      )}
      {index === 2 && (
        <>
          <g className="art-plane art-plane-back">
            <path
              d="M78 276V213H147V148H216V84H291V276Z"
              fill="var(--art-fill)"
            />
          </g>
          <g className="art-plane art-plane-front">
            <path
              d="M51 296H326M94 276V231H167V167H239V103H316"
              className="art-accent"
            />
            <path d="M113 199V167H187M186 132V101H258" className="art-detail" />
          </g>
          <rect x="273" y="53" width="43" height="43" fill="var(--art-paper)" />
        </>
      )}
      {index === 3 && (
        <>
          <g className="art-plane art-plane-back">
            <path
              d="M57 79L199 106L341 79V247L199 278L57 247Z"
              fill="var(--art-fill)"
            />
          </g>
          <g className="art-plane art-plane-front">
            <path
              d="M76 59L199 88L322 59V229L199 259L76 229Z"
              fill="var(--art-paper)"
            />
            <path d="M199 88V259" className="art-accent" />
            <path
              d="M105 108L169 122M105 144L169 158M105 180L151 191M229 120L292 105M229 156L292 141M229 192L274 181"
              className="art-detail"
            />
          </g>
        </>
      )}
      {index === 4 && (
        <>
          <g className="art-plane art-plane-back">
            <rect
              x="69"
              y="63"
              width="192"
              height="233"
              fill="var(--art-fill)"
            />
            <path
              d="M102 110H225M102 144H205M102 178H224M102 212H175"
              className="art-detail"
            />
          </g>
          <g className="art-plane art-plane-front">
            <circle cx="254" cy="135" r="68" fill="var(--art-paper)" />
            <path d="M302 183L345 226" className="art-accent" />
            <path d="M226 136H282M254 109V164" className="art-detail" />
          </g>
        </>
      )}
      {index === 5 && (
        <>
          <g className="art-plane art-plane-back">
            <path
              d="M77 276V155C77 86 128 49 199 49C270 49 321 86 321 155V276Z"
              fill="var(--art-fill)"
            />
          </g>
          <g className="art-plane art-plane-front">
            <path
              d="M113 276V163C113 115 147 86 199 86C251 86 285 115 285 163V276"
              className="art-accent"
            />
            <path
              d="M151 276V176C151 146 169 128 199 128C229 128 247 146 247 176V276"
              fill="var(--art-paper)"
            />
            <path d="M54 276H345" />
          </g>
        </>
      )}
    </svg>
  );
}
