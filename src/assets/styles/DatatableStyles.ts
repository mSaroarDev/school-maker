export const dataTableStyles = {
  headRow: {
    style: {
      background: '#ecf9fe',
      fontWeight: 'semibold',
      // fontSize: '14px',
      borderRadius: "10px 10px 0px 0px",
      // marginBottom: "1px",
      // borderTop: "1px solid #ccc",
      // borderBottom: "1px solid #ccc",
    }
  },
  rows: {
    style: {
      padding: '14px 0px',
      // marginBottom: ".5px",
      // marginTop: ".5px",
      // borderRadius: "4px",
      // border: `.5px solid #f7f5f9`,
      borderBottom: "1px solid #f0f0f0",
    },
  },
  cells: {
    style: {
      // fontSize: '14px',
    }
  },
  tableWrapper: {
    style: {
      backgroundColor: 'transparent',
    }
  },
  table: {
    style: {
      backgroundColor: 'transparent',
    }
  }
}

export const darkDataTableStyles = {
  headRow: {
    style: {
      background: '#1f2937',
      color: '#f7f5f9',
      fontWeight: 'semibold',
      fontSize: '14px',
      borderRadius: "10px 10px 0px 0px",
      marginBottom: "1px solid #1f2937",
      border: `1px solid #1f2937`,
    }
  },
  rows: {
    style: {
      background: '#1f2937',
      color: '#f7f5f9',
      padding: '14px 0px',
      // marginBottom: ".5px solid #1f2937",
      // marginTop: ".5px solid #1f2937",
      borderRadius: "0px",
      border: `.5px solid #1f2937`,
    },
  },
  cells: {
    style: {
      // fontSize: '14px',
    }
  },
  tableWrapper: {
    style: {
      backgroundColor: 'transparent',
    }
  },
  table: {
    style: {
      backgroundColor: 'transparent',
    }
  }
}

// Mobile light mode styles
export const mobileLightDataTableStyles = {
  rows: {
    style: {
      background: '#ffffff',
      color: '#000000',
      padding: '4px 0px',      // Reduced from 12px to 4px
      marginBottom: "2px",     // Reduced from 8px to 3px
      // marginTop: "3px",        // Reduced from 8px to 3px
      borderRadius: "4px",     // Reduced from 8px to 4px
      border: `1px solid #f0f0f0`,
      boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
    },
  },
  cells: {
    style: {
      // fontSize: '14px',
      padding: '6px 8px',      // Reduced from 12px 16px to 6px 8px
    }
  },
  tableWrapper: {
    style: {
      backgroundColor: 'transparent',
    }
  },
  table: {
    style: {
      backgroundColor: 'transparent',
    }
  }
}

// Mobile dark mode styles
export const mobileDarkDataTableStyles = {
  rows: {
    style: {
      background: '#2d3748',
      color: '#f7f5f9',
      padding: '4px 0px',      // Reduced from 12px to 4px
      marginBottom: "2px",     // Reduced from 8px to 3px
      // marginTop: "1px",        // Reduced from 8px to 3px
      borderRadius: "6px",     // Reduced from 8px to 4px
      border: `1px solid #374151`,
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    },
  },
  cells: {
    style: {
      // fontSize: '14px',
      padding: '6px 8px',      // Reduced from 12px 16px to 6px 8px
      color: '#f7f5f9',
    }
  },
  tableWrapper: {
    style: {
      backgroundColor: 'transparent',
    }
  },
  table: {
    style: {
      backgroundColor: 'transparent',
    }
  }
}