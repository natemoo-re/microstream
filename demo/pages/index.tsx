import { h, Fragment, createInclude, definePage } from 'microstream';

const Include = createInclude(import.meta.url);

export default definePage(({ response }) => {
    response.headers.append('Cache-Control', 'test');
    
    return (
        <>
            <div>Hello index page!</div>
            <Include src="../assets/partial.html" />
        </>
    )
})
