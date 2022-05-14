import { h, Fragment, use, createInclude, definePage } from '../../lib/mod.ts';

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

function Skeleton({ bind }: any) {
    return <use.await bind={bind} timeout={1000}>
        <use.placeholder>
            <div style="aspect-ratio: 1/1; flex: 1; background: whitesmoke;" />
        </use.placeholder>
        <use.then>
            {(result: any) => <div style={`aspect-ratio: 1/1; flex: 1; background: ${result};`} />}
        </use.then>
        <use.catch>
            {(err: any) => <div style="aspect-ratio: 1/1; flex: 1; border: 1px solid red; background: whitesmoke;" />}
        </use.catch>
    </use.await>
}

export default definePage(({ params }) => {
    const { slug } = params;
    const Include = createInclude(import.meta.url);

    return (
        <html>
            <head>
                <title>{slug}</title>
            </head>
            <body style="font-family: system-ui;">
                <h1>Hello <strong>{slug}</strong>!</h1>
                <main style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1em; max-width: 100vw;">
                    <Skeleton bind={sleep(200).then(() => 'red')} />
                    <Skeleton bind={sleep(400).then(() => 'orange')} />
                    <Skeleton bind={sleep(750).then(() => 'yellow')} />
                    <Skeleton bind={sleep(750).then(() => 'green')} />
                    <Skeleton bind={sleep(500).then(() => 'blue')} />
                    <Skeleton bind={sleep(1000).then(() => 'rebeccapurple')} />
                </main>
            </body>
        </html>
    )
})
