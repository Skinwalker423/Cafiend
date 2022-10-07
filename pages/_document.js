import Document, {Html, Main, NextScript, Head} from "next/document";

class MyDocument extends Document{

render(){
    return (
        <Html>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&display=swap" rel="stylesheet"></link>
                <meta name="description" content="Ice Cream Dreams"></meta>
            </Head>
            <body>
                <Main>

                </Main>
                <NextScript />
            </body>
        </Html>
    )
}
}

export default MyDocument;

