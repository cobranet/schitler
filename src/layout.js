import React from 'react';

const Layout = (props) => {
    return (
	<div>
	    <div>Header</div>
	    {props.children}
	    <div>Footer</div>
	</div>
    );
}

export default Layout;

