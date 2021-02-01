import { Link } from 'react-router-dom';
import pokemonLogo from './../assets/images/logo_pokemon.png'

import { Menu, Dropdown } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const HeaderTemplate = () => {
    return (
        <header>
            <Link to="/"><img src={pokemonLogo} className="logo-style" /></Link>
            <div className="menu-nonresponsive">
                <Link className="nav-links" to="/">Home</Link>
                <Link className="nav-links" to="/listPokemon">My Pokemon List</Link>
            </div>

            <div className="menu-responsive">
                <Dropdown overlay={
                    <Menu>
                        <Menu.Item>
                            <a rel="noopener noreferrer" href="/">Home</a>
                            {/* <Link className="nav-links" to="/">Home</Link> */}
                        </Menu.Item>
                        <Menu.Item>
                            <a rel="noopener noreferrer" href="/listPokemon">My Pokemon List</a>
                            {/* <Link className="nav-links" to="/listPokemon">My Pokemon List</Link> */}
                        </Menu.Item>
                    </Menu>
                }>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}><MenuOutlined />
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}

export default HeaderTemplate