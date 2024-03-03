import React, { useEffect } from 'react';

function AdSense() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-1156474988180867"
      data-ad-slot="9847427597"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

export default AdSense;
