const fs = require('fs');

const path = 'c:/Users/prath/OneDrive/Documents/@Downloads/@healthyday/@production/dashboard-test-healthyday/src/pages/Index.tsx';
let lines = fs.readFileSync(path, 'utf8').split('\n');

const newContent = `    const attendance: string[] = studentData?.attendance ?? [];
    const completedDayStatus = Array.from({ length: 14 }, (_, i) => {
      const dayNum = i + 1;
      const didJoin = joinedDays.includes(dayNum);
      const raw = attendance[i];
      if (didJoin || raw === 'present') return 'green';
      return 'yellow'; // not attended
    });

    const completedDateRangeLabel = (() => {
      if (!studentData?.free_batch_start_date) return '';
      const batchStart = new Date(studentData?.free_batch_start_date);
      const batchEnd = new Date(batchStart);
      batchEnd.setDate(batchStart.getDate() + 13);
      const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const MON_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const fmt = (d: Date) => \\\`\\\${DAY_NAMES[d.getDay()]}, \\\${MON_NAMES[d.getMonth()]} \\\${String(d.getDate()).padStart(2, "0")}\\\`;
      return \\\`\\\${fmt(batchStart)} – \\\${fmt(batchEnd)}\\\`;
    })();

    return (
      <div className="mx-auto w-[412px] min-h-screen bg-background" style={{ fontFamily: 'Outfit, sans-serif' }}>
        {/* Header */}
        <header
          className="flex w-[412px] h-[68px] items-center bg-background"
          style={{
            padding: '20px 247px 20px 20px',
            boxShadow: '0 4px 30px 0 rgba(0, 0, 0, 0.10)',
          }}
        >
          <img src={logo} alt="Healthyday" className="h-7" />
        </header>

        <PricingAndComparisonSection 
          selectedPlanIdx={selectedPlanIdx} 
          setSelectedPlanIdx={setSelectedPlanIdx} 
          daysLeft={0} 
          completedDateRangeLabel={completedDateRangeLabel}
          completedDayStatus={completedDayStatus}
        />`;

// Find start and end indices dynamically to be 100% safe
const startIndex = lines.findIndex(line => line.includes('// Sample attendance data:'));
const endIndex = lines.findIndex(line => line.includes('{/* Refer & Earn — only shown after popup is dismissed */}'));

if (startIndex !== -1 && endIndex !== -1) {
  lines.splice(startIndex, endIndex - startIndex, newContent);
  fs.writeFileSync(path, lines.join('\n'), 'utf8');
  console.log("Replacer executed successfully. Replaced lines " + startIndex + " to " + endIndex);
} else {
  console.log("Could not find markers: " + startIndex + " , " + endIndex);
}
