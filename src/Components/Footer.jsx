import React from 'react'

function Footer() {
    const footerStyle = {
        backgroundColor: '#282828',
        color: 'white',
        textAlign: 'center',
        padding: '1em 0',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
    };

    return (
        <footer style={footerStyle}>
            © 2024 Rentify ltd. All rights reserved.
        </footer>
    );
}

export default Footer