import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
  return (
    <Html lang="ko">
      <Head/>
      <body>
        <Main/>
        <NextScript/>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var script = document.createElement('script');
              script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_JS_KEY}&libraries=services&autoload=false';
              document.body.appendChild(script);
            `,
          }}
        />
      </body>
    </Html>
  )
}