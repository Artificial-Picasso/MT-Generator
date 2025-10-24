import React, { useState } from 'react';
import { AlertCircle, Download, Loader2, FileText, Shield, Heart, Leaf, Lock, Users, Activity, Copy, Check } from 'lucide-react';

const MTGenerator = () => {
  const [formData, setFormData] = useState({
    numberOfTopics: 1,
    selectedCategories: ['Safety'],
    month: 'November',
    country: 'South Africa',
    province: 'Gauteng',
    climate: 'Subtropical',
    focus: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  const categories = [
    { value: 'Safety', icon: Shield, color: 'text-yellow-500' },
    { value: 'Health', icon: Heart, color: 'text-red-500' },
    { value: 'Environment', icon: Leaf, color: 'text-green-500' },
    { value: 'Security', icon: Lock, color: 'text-blue-500' },
    { value: 'Managerial', icon: Users, color: 'text-purple-500' },
    { value: 'Wellness', icon: Activity, color: 'text-pink-500' }
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const climateTypes = [
    'Tropical',
    'Subtropical',
    'Desert/Arid',
    'Semi-Arid',
    'Mediterranean',
    'Temperate',
    'Continental',
    'Oceanic',
    'Polar',
    'Alpine/Mountain'
  ];

  const locationData = {
    'South Africa': {
      provinces: ['Gauteng', 'Western Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape'],
      climates: ['Subtropical', 'Semi-Arid', 'Desert/Arid', 'Mediterranean', 'Temperate']
    },
    'Australia': {
      provinces: ['New South Wales', 'Queensland', 'Victoria', 'Western Australia', 'South Australia', 'Tasmania', 'Northern Territory'],
      climates: ['Tropical', 'Subtropical', 'Desert/Arid', 'Temperate', 'Mediterranean']
    },
    'Canada': {
      provinces: ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Saskatchewan', 'Manitoba', 'Nova Scotia', 'New Brunswick', 'Newfoundland and Labrador', 'Yukon', 'Northwest Territories', 'Nunavut'],
      climates: ['Continental', 'Oceanic', 'Polar', 'Temperate']
    },
    'United States': {
      provinces: ['Alaska', 'Arizona', 'California', 'Colorado', 'Montana', 'Nevada', 'New Mexico', 'Texas', 'Utah', 'Wyoming', 'West Virginia', 'Kentucky', 'Pennsylvania'],
      climates: ['Desert/Arid', 'Semi-Arid', 'Continental', 'Temperate', 'Polar', 'Mediterranean', 'Subtropical']
    },
    'Chile': {
      provinces: ['Antofagasta', 'Atacama', 'Coquimbo', 'Valparaíso', 'Metropolitana', "O'Higgins", 'Maule', 'Aysén', 'Magallanes'],
      climates: ['Desert/Arid', 'Mediterranean', 'Temperate', 'Alpine/Mountain', 'Polar']
    },
    'Brazil': {
      provinces: ['Minas Gerais', 'Pará', 'Goiás', 'Bahia', 'Mato Grosso', 'São Paulo', 'Rio de Janeiro', 'Amazonas'],
      climates: ['Tropical', 'Subtropical', 'Semi-Arid']
    },
    'Peru': {
      provinces: ['Arequipa', 'Cajamarca', 'Cusco', 'La Libertad', 'Puno', 'Ancash', 'Junín', 'Moquegua', 'Tacna'],
      climates: ['Alpine/Mountain', 'Desert/Arid', 'Tropical', 'Semi-Arid']
    },
    'Russia': {
      provinces: ['Siberia', 'Yakutia', 'Krasnoyarsk', 'Irkutsk', 'Magadan', 'Kamchatka', 'Murmansk', 'Urals'],
      climates: ['Polar', 'Continental', 'Temperate']
    },
    'China': {
      provinces: ['Inner Mongolia', 'Xinjiang', 'Shanxi', 'Hebei', 'Liaoning', 'Shandong', 'Yunnan', 'Sichuan', 'Qinghai'],
      climates: ['Continental', 'Desert/Arid', 'Temperate', 'Alpine/Mountain', 'Subtropical']
    },
    'India': {
      provinces: ['Jharkhand', 'Odisha', 'Chhattisgarh', 'Rajasthan', 'Karnataka', 'Madhya Pradesh', 'Gujarat', 'Goa'],
      climates: ['Tropical', 'Subtropical', 'Semi-Arid', 'Desert/Arid']
    },
    'Indonesia': {
      provinces: ['East Kalimantan', 'Papua', 'West Papua', 'South Sulawesi', 'North Sumatra', 'Riau', 'Jambi'],
      climates: ['Tropical']
    },
    'Mexico': {
      provinces: ['Sonora', 'Chihuahua', 'Durango', 'Zacatecas', 'Coahuila', 'San Luis Potosí', 'Guerrero'],
      climates: ['Desert/Arid', 'Semi-Arid', 'Subtropical', 'Tropical']
    },
    'Kazakhstan': {
      provinces: ['Karaganda', 'Pavlodar', 'East Kazakhstan', 'Aktobe', 'Kostanay', 'Akmola'],
      climates: ['Continental', 'Desert/Arid', 'Semi-Arid']
    },
    'Zambia': {
      provinces: ['Copperbelt', 'North-Western', 'Central', 'Luapula', 'Northern', 'Southern'],
      climates: ['Tropical', 'Subtropical']
    },
    'DRC (Congo)': {
      provinces: ['Katanga', 'Lualaba', 'Haut-Katanga', 'Kasai', 'Kasai-Central', 'South Kivu'],
      climates: ['Tropical']
    },
    'Ghana': {
      provinces: ['Western', 'Ashanti', 'Eastern', 'Central', 'Brong-Ahafo', 'Upper East'],
      climates: ['Tropical']
    }
  };

  const handleNumberChange = (num) => {
    const newNum = parseInt(num);
    setFormData(prev => {
      let newCategories = [...prev.selectedCategories];
      
      if (newNum === 6) {
        newCategories = categories.map(c => c.value);
      } else if (newCategories.length > newNum) {
        newCategories = newCategories.slice(0, newNum);
      } else if (newCategories.length < newNum) {
        const available = categories.filter(c => !newCategories.includes(c.value));
        while (newCategories.length < newNum && available.length > 0) {
          newCategories.push(available.shift().value);
        }
      }
      
      return {
        ...prev,
        numberOfTopics: newNum,
        selectedCategories: newCategories
      };
    });
  };

  const toggleCategory = (categoryValue) => {
    setFormData(prev => {
      const isSelected = prev.selectedCategories.includes(categoryValue);
      let newCategories;
      
      if (isSelected) {
        newCategories = prev.selectedCategories.filter(c => c !== categoryValue);
      } else {
        if (prev.selectedCategories.length < prev.numberOfTopics) {
          newCategories = [...prev.selectedCategories, categoryValue];
        } else {
          newCategories = [...prev.selectedCategories.slice(1), categoryValue];
        }
      }
      
      return {
        ...prev,
        selectedCategories: newCategories
      };
    });
  };

  const applyPreset = (preset) => {
    switch(preset) {
      case 'safety-focused':
        setFormData(prev => ({...prev, numberOfTopics: 2, selectedCategories: ['Safety', 'Health']}));
        break;
      case 'environment':
        setFormData(prev => ({...prev, numberOfTopics: 2, selectedCategories: ['Environment', 'Wellness']}));
        break;
      case 'management':
        setFormData(prev => ({...prev, numberOfTopics: 3, selectedCategories: ['Managerial', 'Security', 'Safety']}));
        break;
      case 'full':
        setFormData(prev => ({...prev, numberOfTopics: 6, selectedCategories: categories.map(c => c.value)}));
        break;
    }
  };

  const copyToClipboard = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleGenerate = async () => {
    if (formData.selectedCategories.length === 0) {
      setError('Please select at least one category');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const selectedCats = formData.selectedCategories.join(', ');
      const isSingle = formData.numberOfTopics === 1;
      
      const prompt = `You are an AI Product Engineer and Creative Mining Communications Designer.
You specialize in generating monthly awareness posters for the mining sector, combining educational insight, compliance alignment, and visual creativity.

Generate poster(s) with the following inputs:
- Number of Posters: ${formData.numberOfTopics}
- Categories: ${selectedCats}
- Month: ${formData.month}
- Location: ${formData.province}, ${formData.country}
- Climate: ${formData.climate}
- Focus: ${formData.focus || 'General awareness'}

IMPORTANT: Consider the climate type (${formData.climate}) and location (${formData.province}, ${formData.country}) when creating seasonal and weather-related content. Tailor safety tips, health advice, and environmental considerations to this specific climate.

${isSingle ? `
Generate ONE poster for ${formData.selectedCategories[0]} with this structure:

## ${formData.selectedCategories[0]} Poster — ${formData.month}

### Poster Theme:
<AI-generated theme>

### Poster Title:
<Creative headline>

### Poster Message:
<2–3 line summary>

### Key Points:
1. <Tip 1>
2. <Tip 2>
3. <Tip 3>
4. <Tip 4>
5. <Tip 5>

### Quote / Slogan:
<Inspirational or educational line>

### Visual Design Suggestion:
<Color palette, layout idea, mining icons or images>

### Compliance Reference:
<Mining act or regulation reference>

### Export (JSON):
\`\`\`json
{
  "category": "${formData.selectedCategories[0]}",
  "month": "${formData.month}",
  "location": {
    "country": "${formData.country}",
    "province": "${formData.province}",
    "climate": "${formData.climate}"
  },
  "theme": "",
  "title": "",
  "message": "",
  "tips": [],
  "quote": "",
  "visual_style": "",
  "law_reference": ""
}
\`\`\`
` : `
Generate ${formData.numberOfTopics} posters for the following categories: ${selectedCats} for ${formData.month}.

For each category, use this structure:
------------------------
## [Number]. [Category] Poster — ${formData.month}
------------------------

### Poster Theme:
### Poster Title:
### Poster Message:
### Key Points:
1-5 points
### Quote / Slogan:
### Visual Design Suggestion:
### Compliance Reference:

At the end, include:
### Export (JSON):
\`\`\`json
{
  "month": "${formData.month}",
  "location": {
    "country": "${formData.country}",
    "province": "${formData.province}",
    "climate": "${formData.climate}"
  },
  "pack": [
${formData.selectedCategories.map(cat => `    { "category": "${cat}", "theme": "", "title": "", "message": "", "tips": [], "quote": "", "visual_style": "", "law_reference": "" }`).join(',\n')}
  ]
}
\`\`\`
`}

Rules:
- Keep tone inspirational, professional, and compliance-aligned
- Base content on the specific climate type: ${formData.climate}
- Consider local weather patterns for ${formData.province}, ${formData.country} in ${formData.month}
- Always mention relevant Mine Health and Safety Act or Environmental Management Regulation applicable to ${formData.country}
- Use short, clear tips — easy to fit on an A3 poster
- Visual suggestions must include mining context (gear, workers, environment) appropriate for ${formData.climate} climate
- No repeated slogans across posters in the same month
- Ensure each category feels unique yet consistent

Focus on current seasonal relevance and ${formData.focus || 'general workplace awareness'}. Tailor all content to ${formData.climate} climate conditions.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [
            { role: "user", content: prompt }
          ],
        })
      });

      const data = await response.json();
      
      if (data.content && data.content[0]) {
        const generatedContent = data.content[0].text;
        setResult(generatedContent);
        
        // Add to history
        setHistory(prev => [{
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          config: {...formData},
          content: generatedContent
        }, ...prev].slice(0, 5)); // Keep last 5
      } else {
        setError('Failed to generate content. Please try again.');
      }
    } catch (err) {
      setError('Error generating posters: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadJSON = () => {
    if (!result) return;
    
    const jsonMatch = result.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      const jsonData = jsonMatch[1];
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mt-generator-${formData.country}-${formData.month}-${formData.numberOfTopics}topics.json`;
      a.click();
    }
  };

  const CategoryIcon = ({ category }) => {
    const cat = categories.find(c => c.value === category);
    if (!cat) return null;
    const Icon = cat.icon;
    return <Icon className={`w-5 h-5 ${cat.color}`} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-12 h-12 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold">MT Generator</h1>
          </div>
          <p className="text-slate-300 text-lg">Mining Safety Poster Creator</p>
          <p className="text-slate-400 text-sm mt-2">AI-Powered Monthly Awareness Campaigns</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-yellow-500" />
                Configuration
              </h2>
              
              <div className="space-y-4">
                <div className="bg-slate-700 rounded p-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Ready to generate:</span>
                    <span className="text-yellow-400 font-semibold">
                      {formData.selectedCategories.length > 0 
                        ? `${formData.selectedCategories.length} poster${formData.selectedCategories.length > 1 ? 's' : ''}`
                        : 'No selection'
                      }
                    </span>
                  </div>
                  {formData.selectedCategories.length > 0 && (
                    <div className="mt-2 text-xs text-slate-400">
                      {formData.selectedCategories.join(' → ')}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Number of Topics</label>
                  <select
                    value={formData.numberOfTopics}
                    onChange={(e) => handleNumberChange(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 focus:outline-none focus:border-yellow-500"
                  >
                    <option value={1}>1 Topic</option>
                    <option value={2}>2 Topics</option>
                    <option value={3}>3 Topics</option>
                    <option value={4}>4 Topics</option>
                    <option value={5}>5 Topics</option>
                    <option value={6}>6 Topics (Full Pack)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Categories ({formData.selectedCategories.length}/{formData.numberOfTopics})
                  </label>
                  <div className="space-y-2 bg-slate-700 rounded p-3 max-h-64 overflow-y-auto">
                    {categories.map(cat => {
                      const isSelected = formData.selectedCategories.includes(cat.value);
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.value}
                          onClick={() => toggleCategory(cat.value)}
                          className={`w-full flex items-center p-2 rounded transition ${
                            isSelected 
                              ? 'bg-yellow-500 text-slate-900' 
                              : 'bg-slate-600 hover:bg-slate-500'
                          }`}
                        >
                          <Icon className={`w-4 h-4 mr-2 ${isSelected ? 'text-slate-900' : cat.color}`} />
                          <span className="text-sm font-medium">{cat.value}</span>
                          {isSelected && (
                            <span className="ml-auto text-xs font-bold">
                              #{formData.selectedCategories.indexOf(cat.value) + 1}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Click to select/deselect. Order matters for multi-topic generation.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Month</label>
                  <select
                    value={formData.month}
                    onChange={(e) => setFormData({...formData, month: e.target.value})}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 focus:outline-none focus:border-yellow-500"
                  >
                    {months.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    placeholder="e.g., South Africa"
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 focus:outline-none focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Province / State</label>
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(e) => setFormData({...formData, province: e.target.value})}
                    placeholder="e.g., Gauteng, Queensland, Arizona"
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 focus:outline-none focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Climate Type</label>
                  <select
                    value={formData.climate}
                    onChange={(e) => setFormData({...formData, climate: e.target.value})}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 focus:outline-none focus:border-yellow-500"
                  >
                    {climateTypes.map(climate => (
                      <option key={climate} value={climate}>{climate}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Focus (Optional)</label>
                  <input
                    type="text"
                    value={formData.focus}
                    onChange={(e) => setFormData({...formData, focus: e.target.value})}
                    placeholder="e.g., Fatigue Awareness"
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 focus:outline-none focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Quick Presets</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => applyPreset('safety-focused')}
                      className="bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded text-xs transition"
                    >
                      🛡️ Safety Focus
                    </button>
                    <button
                      onClick={() => applyPreset('environment')}
                      className="bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded text-xs transition"
                    >
                      🌿 Environment
                    </button>
                    <button
                      onClick={() => applyPreset('management')}
                      className="bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded text-xs transition"
                    >
                      👥 Management
                    </button>
                    <button
                      onClick={() => applyPreset('full')}
                      className="bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded text-xs transition"
                    >
                      📦 Full Pack
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading || formData.selectedCategories.length === 0}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold py-3 rounded transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    `Generate ${formData.numberOfTopics} Poster${formData.numberOfTopics > 1 ? 's' : ''}`
                  )}
                </button>

                {formData.selectedCategories.length === 0 && (
                  <p className="text-xs text-red-400 -mt-2">
                    ⚠️ Please select at least one category
                  </p>
                )}

                {history.length > 0 && (
                  <button
                    onClick={() => setHistory([])}
                    className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs py-2 rounded transition"
                  >
                    🗑️ Clear History ({history.length})
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700 min-h-96">
              {error && (
                <div className="bg-red-900/30 border border-red-500 rounded p-4 flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-red-200">{error}</div>
                </div>
              )}

              {!result && !loading && !error && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-2">Configure settings and click Generate to create posters</p>
                  <div className="text-sm text-slate-500">
                    Selected: {formData.selectedCategories.join(', ') || 'None'}
                  </div>
                </div>
              )}

              {loading && (
                <div className="text-center py-12">
                  <Loader2 className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-spin" />
                  <p className="text-slate-300 mb-2">Generating your posters...</p>
                  <div className="text-sm text-slate-400">
                    Creating {formData.numberOfTopics} poster{formData.numberOfTopics > 1 ? 's' : ''} for {formData.month}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {formData.province}, {formData.country} • {formData.climate} Climate
                  </div>
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {formData.selectedCategories.map((cat, idx) => (
                      <span key={cat} className="text-xs bg-slate-700 px-3 py-1 rounded">
                        {idx + 1}. {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Generated Content</h2>
                    <div className="flex gap-2">
                      <button
                        onClick={copyToClipboard}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center text-sm transition"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </>
                        )}
                      </button>
                      <button
                        onClick={downloadJSON}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center text-sm transition"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download JSON
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-900 rounded p-6 overflow-auto max-h-[70vh]">
                    <pre className="whitespace-pre-wrap text-slate-200 font-mono text-sm leading-relaxed">
                      {result}
                    </pre>
                  </div>

                  {history.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <h3 className="text-sm font-semibold mb-2">Recent Generations</h3>
                      <div className="space-y-2">
                        {history.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setResult(item.content)}
                            className="w-full bg-slate-900 hover:bg-slate-700 p-3 rounded text-left transition"
                          >
                            <div className="flex justify-between items-start">
                              <div className="text-xs">
                                <span className="text-yellow-400 font-medium">
                                  {item.config.selectedCategories.join(', ')}
                                </span>
                                <span className="text-slate-400 ml-2">• {item.config.month}</span>
                                <span className="text-slate-500 ml-2">• {item.config.country}</span>
                              </div>
                              <span className="text-slate-500 text-xs">{item.timestamp}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-400 text-sm">
          <p>MT Generator v1.0 • AI-Powered Mining Communications</p>
          {history.length > 0 && (
            <p className="mt-2 text-slate-500">
              Session: {history.length} generation{history.length !== 1 ? 's' : ''} completed
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MTGenerator;