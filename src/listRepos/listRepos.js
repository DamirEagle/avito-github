import React from 'react';
import ItemRepos from '../itemRepos/itemRepos';


function listRepos(props) {

    return (
        <div>

            {props.json.map((item, index) => <ItemRepos key={index} name={item.name} stargazers_count={item.stargazers_count} updated_at={item.updated_at} login={item.owner.login} html_url={item.html_url}></ItemRepos>)}

        </div>
    );
}

export default listRepos;