import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TemplateHeader from './../template/headerTemplate'
import Home from './Home/Home';
import Detail from './Detail/Detail'

const AppRoute = () => {
    return (
        <Router>
            <TemplateHeader />

            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/detailPokemon/:idPokemon">
                    <Detail />
                </Route>
                <Route path="/listPokemon" exact>
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
};


export default AppRoute;
