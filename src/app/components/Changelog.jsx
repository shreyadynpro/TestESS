'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function Changelog() {
  const [isOpen, setIsOpen] = useState(false);

  // Check if changelog was already shown in this session
  useEffect(() => {
    const sessionChangelogShown = sessionStorage.getItem('changelogShownInSession');
    if (!sessionChangelogShown) {
      setIsOpen(true);
      sessionStorage.setItem('changelogShownInSession', 'true');
    }
  }, []);

  // Replace this with your actual changelog data
  const changelogEntries = [
    {
      version: '1.0',
      badge: 'Improvement',
      items: [
        'FAQ — Frequently Asked Questions section added',
        'Cultural Initiatives — Cultural initiatives section added',
        'IT Support — UI added, backend API missing',
        'Calendar Card — Apply leave option added and leave balance displayed',
        'Role-based Search Bar — Search bar with suggestions based on user roles',
        'Dark & Light Mode — Activated for the Home Page',
        "What's New Popup — Popup shows improvements and version changes",
        'Profile Update Restriction — Update profile disabled for roles except IDs 3 and 7 (Billable & Non-billable)',
      ],
    },
  ];

  const getBadgeColor = (badge) => {
    switch (badge.toLowerCase()) {
      case 'new':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'fixed':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'major':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderRadius: '9999px',
          background: 'linear-gradient(to right, #7c3aed, #4f46e5)',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: 500,
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        }}
        aria-label="View changelog"
      >
        <Sparkles style={{ height: '20px', width: '20px' }} />
        <span>What's New</span>
      </button>

      {/* Changelog Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            }}
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              zIndex: 50,
              width: '100%',
              maxWidth: '28rem',
              borderRadius: '16px',
              border: '1px solid #e5e7eb',
              backgroundColor: 'white',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              maxHeight: '600px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #e5e7eb',
                padding: '16px 24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles style={{ height: '20px', width: '20px', color: '#7c3aed' }} />
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', margin: 0 }}>
                  What's New
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  borderRadius: '8px',
                  padding: '4px',
                  color: '#9ca3af',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.color = '#4b5563';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#9ca3af';
                }}
                aria-label="Close"
              >
                <X style={{ height: '20px', width: '20px' }} />
              </button>
            </div>

            {/* Changelog Entries */}
            <div
              style={{
                overflowY: 'auto',
                padding: '16px 24px',
              }}
            >
              {changelogEntries.map((entry, index) => (
                <div
                  key={index}
                  style={{ marginBottom: index < changelogEntries.length - 1 ? '24px' : 0 }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <h3
                        style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: 0 }}
                      >
                        v{entry.version}
                      </h3>
                      <span
                        style={{
                          borderRadius: '9999px',
                          padding: '2px 8px',
                          fontSize: '12px',
                          fontWeight: 500,
                          ...(entry.badge.toLowerCase() === 'new' && {
                            backgroundColor: '#dcfce7',
                            color: '#15803d',
                          }),
                          ...(entry.badge.toLowerCase() === 'fixed' && {
                            backgroundColor: '#dbeafe',
                            color: '#1e40af',
                          }),
                          ...(entry.badge.toLowerCase() === 'major' && {
                            backgroundColor: '#f3e8ff',
                            color: '#7e22ce',
                          }),
                        }}
                      >
                        {entry.badge}
                      </span>
                    </div>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>{entry.date}</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {entry.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        style={{
                          display: 'flex',
                          gap: '8px',
                          fontSize: '14px',
                          color: '#4b5563',
                          marginBottom: itemIndex < entry.items.length - 1 ? '8px' : 0,
                        }}
                      >
                        <span
                          style={{
                            marginTop: '6px',
                            height: '6px',
                            width: '6px',
                            flexShrink: 0,
                            borderRadius: '50%',
                            backgroundColor: '#7c3aed',
                          }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {index < changelogEntries.length - 1 && (
                    <div
                      style={{
                        borderBottom: '1px solid #f3f4f6',
                        paddingTop: '12px',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}