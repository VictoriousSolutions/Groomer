import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";


const client = new ApolloClient({
  uri: "https://api-useast.graphcms.com/v1/cjw55u46y3t0201ehvewzsi7m/master"
});


const Cuts = () => (
    <Query
      query={gql`
          query content($first: Int, $skip: Int, $where: PatternWhereInput, $orderBy: PatternOrderByInput) {
                patterns: patternsConnection(first: $first, skip: $skip, where: $where, orderBy: $orderBy) {
                  edges {
                    node {
                      status
                      updatedAt
                      createdAt
                      id
                      name
                      images {
                        status
                        updatedAt
                        createdAt
                        id
                        handle
                        fileName
                        height
                        width
                        size
                        mimeType
                      }
                      tools
                      instructions
                      breed {
                        id
                        name
                      }
                    }
                  }
                }
              }
      `}
    >
      {({ loading, error, data } : any) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
  
        return data.patterns.edges.map(({ node } : any) => (
          <div key={node.name}>
            <Link to={`/cut/${node.id}`}>{node.breed.name} - {node.name}</Link>
          </div>
        ));
      }}
    </Query>
  );


  interface Variables {
    where: string;
  };

  const x : Variables = {where: "id=cjw56uher4awf0946vyhwiuno"};

  const Cut = () => (
    <Query 
        variables={x}
        query={gql`
          query content($first: Int, $skip: Int, $where: PatternWhereInput, $orderBy: PatternOrderByInput) {
                patterns: patternsConnection(first: $first, skip: $skip, where: $where, orderBy: $orderBy) {
                  edges {
                    node {
                      status
                      updatedAt
                      createdAt
                      id
                      name
                      images {
                        status
                        updatedAt
                        createdAt
                        id
                        handle
                        fileName
                        height
                        width
                        size
                        mimeType
                      }
                      tools
                      instructions
                      breed {
                        id
                        name
                      }
                    }
                  }
                }
              }
      `}
    >
      {({ loading, error, data } : any) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
  
        return data.patterns.edges.map(({ node } : any) => (
          <div key={node.name}>
            <Link to={`/cut/${node.id}`}>{node.breed.name} - {node.name}</Link>
          </div>
        ));
      }}
    </Query>
  );

const Index : any = () => {
    return(
        <div>
            <h2>Grooming Fieldguide</h2>
            <Cuts/>
        </div>
    )
}

const CutInfo : any  = ({match} : any) => {
    return(
        <div>
            Cut info {match.params.cutId}
            <Cut/>
        </div>
    )
}

const App = () => (
    <ApolloProvider client={client}>

        <Router>
            <div>
                <nav>
                    <Index/>
                </nav>
                <Route path="/cut/:cutId" component={CutInfo} />             
            </div>
        </Router>


    </ApolloProvider>
  );

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
