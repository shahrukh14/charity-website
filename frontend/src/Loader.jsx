import React from "react";

const Loader = () => {
    return (
        <div style={styles.overlay}>
            <div style={styles.spinner}></div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
    },
    spinner: {
        width: '60px',
        height: '60px',
        border: '6px solid #f3f3f3',
        borderTop: '6px solid #007bff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    }
};

// THis keyframe animation added globally  in index.css
/*
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
*/

export default Loader;
