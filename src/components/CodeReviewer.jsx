import React, { useState } from 'react';
import './CodeReviewer.css';

function CodeReviewer() {
    const [code, setCode] = useState('');
    const [review, setReview] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReview = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            });
            const data = await response.json();
            setReview(data.review);
        } catch (error) {
            setReview('Error fetching review.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="code-reviewer">
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here"
            />
            <button onClick={handleReview} disabled={loading}>
                {loading ? 'Reviewing...' : 'Review Code'}
            </button>
            <div className="review-output">
                {review ? <pre>{review}</pre> : null}
            </div>
        </div>
    );
}

export default CodeReviewer;
