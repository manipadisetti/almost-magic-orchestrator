# Command Agent v2 - Requirements Upload Feature
**Feature Name:** Intelligent Requirements Processor  
**Priority:** CRITICAL ⭐⭐⭐  
**Build Time:** 8-12 hours  
**Date:** 6 November 2025

---

## 🎯 THE PROBLEM

**Current State:**
- User explains requirements in chat
- Requirements get lost in conversation
- Complex specs hard to communicate
- No single source of truth
- Have to re-explain every time

**Example:**
```
User: "Build PPA with these features: task management, calendar, email..."
[50 messages later]
User: "Wait, I also need..."
```

---

## ✨ THE SOLUTION

**Requirements Upload System:**

```
User uploads → Command Agent reads → Builds to spec → References forever

Supported formats:
✅ .md (Markdown)
✅ .docx (Word documents)  
✅ .pdf (PDF documents)
✅ .txt (Plain text)
✅ .json (Structured data)
```

---

## 🏗️ ARCHITECTURE

### File Structure

```
~/almost-magic/command-agent/
├── requirements/              # User-uploaded requirements
│   ├── agents/                # Agent specifications
│   │   ├── PPA_Requirements_v2.0.docx
│   │   ├── DRA_Master_Builder.docx
│   │   ├── CIA_Features.md
│   │   └── ...
│   ├── projects/              # Project requirements
│   │   ├── digital-sentinel/
│   │   │   ├── requirements.md
│   │   │   ├── api-spec.json
│   │   │   └── design-mockups.pdf
│   │   └── ...
│   ├── website-copy/          # Website content
│   │   ├── Almost_Magic_Website_Copy.docx
│   │   ├── landing-page.md
│   │   └── ...
│   └── templates/             # Reusable templates
│       ├── agent-template.md
│       ├── app-template.md
│       └── ...
├── src/
│   └── requirements_processor.py  # NEW: Processes uploads
└── ...
```

---

## 🔧 TECHNICAL IMPLEMENTATION

### 1. File Upload Handler

```python
# src/requirements_processor.py

import os
from pathlib import Path
from typing import Dict, List, Optional
import docx
import PyPDF2
import json
import markdown

class RequirementsProcessor:
    """Process uploaded requirements documents"""
    
    def __init__(self, requirements_dir: str = "requirements"):
        self.requirements_dir = Path(requirements_dir)
        self.requirements_dir.mkdir(exist_ok=True)
        
        # Create subdirectories
        (self.requirements_dir / "agents").mkdir(exist_ok=True)
        (self.requirements_dir / "projects").mkdir(exist_ok=True)
        (self.requirements_dir / "website-copy").mkdir(exist_ok=True)
        (self.requirements_dir / "templates").mkdir(exist_ok=True)
    
    def upload_file(self, file_path: str, category: str = "projects") -> Dict:
        """
        Upload and process a requirements file
        
        Args:
            file_path: Path to the file to upload
            category: Category (agents, projects, website-copy, templates)
        
        Returns:
            Dict with file info and extracted content
        """
        file_path = Path(file_path)
        
        if not file_path.exists():
            raise FileNotFoundError(f"File not found: {file_path}")
        
        # Determine file type
        file_ext = file_path.suffix.lower()
        
        # Extract content based on file type
        if file_ext == '.md':
            content = self._extract_markdown(file_path)
        elif file_ext == '.docx':
            content = self._extract_docx(file_path)
        elif file_ext == '.pdf':
            content = self._extract_pdf(file_path)
        elif file_ext == '.txt':
            content = self._extract_text(file_path)
        elif file_ext == '.json':
            content = self._extract_json(file_path)
        else:
            raise ValueError(f"Unsupported file type: {file_ext}")
        
        # Save to appropriate category
        dest_path = self.requirements_dir / category / file_path.name
        
        # Copy original file
        import shutil
        shutil.copy2(file_path, dest_path)
        
        # Extract and save as markdown for easy reading
        md_path = dest_path.with_suffix('.extracted.md')
        with open(md_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        # Index in database
        self._index_requirement(
            filename=file_path.name,
            category=category,
            content=content,
            file_path=str(dest_path)
        )
        
        return {
            'success': True,
            'filename': file_path.name,
            'category': category,
            'path': str(dest_path),
            'content_length': len(content),
            'extracted_path': str(md_path)
        }
    
    def _extract_markdown(self, file_path: Path) -> str:
        """Extract content from Markdown file"""
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    
    def _extract_docx(self, file_path: Path) -> str:
        """Extract content from Word document"""
        doc = docx.Document(file_path)
        
        content = []
        for para in doc.paragraphs:
            content.append(para.text)
        
        # Extract tables
        for table in doc.tables:
            for row in table.rows:
                row_data = [cell.text for cell in row.cells]
                content.append(" | ".join(row_data))
        
        return "\n\n".join(content)
    
    def _extract_pdf(self, file_path: Path) -> str:
        """Extract content from PDF"""
        with open(file_path, 'rb') as f:
            pdf_reader = PyPDF2.PdfReader(f)
            
            content = []
            for page in pdf_reader.pages:
                content.append(page.extract_text())
            
            return "\n\n".join(content)
    
    def _extract_text(self, file_path: Path) -> str:
        """Extract content from text file"""
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    
    def _extract_json(self, file_path: Path) -> str:
        """Extract content from JSON file"""
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Convert to readable markdown
        return self._json_to_markdown(data)
    
    def _json_to_markdown(self, data: Dict, level: int = 0) -> str:
        """Convert JSON to markdown format"""
        md = []
        indent = "  " * level
        
        for key, value in data.items():
            if isinstance(value, dict):
                md.append(f"{indent}## {key}")
                md.append(self._json_to_markdown(value, level + 1))
            elif isinstance(value, list):
                md.append(f"{indent}## {key}")
                for item in value:
                    if isinstance(item, dict):
                        md.append(self._json_to_markdown(item, level + 1))
                    else:
                        md.append(f"{indent}- {item}")
            else:
                md.append(f"{indent}**{key}:** {value}")
        
        return "\n".join(md)
    
    def _index_requirement(self, filename: str, category: str, 
                          content: str, file_path: str):
        """Index requirement in database for search"""
        # Connect to PostgreSQL
        import psycopg2
        
        conn = psycopg2.connect(
            host="170.64.228.171",
            port=3000,
            database="postgres",
            user="default",
            password=os.getenv("POSTGRES_PASSWORD")
        )
        
        cursor = conn.cursor()
        
        # Create table if not exists
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS requirements_index (
                id SERIAL PRIMARY KEY,
                filename VARCHAR(255) NOT NULL,
                category VARCHAR(100) NOT NULL,
                content TEXT NOT NULL,
                file_path TEXT NOT NULL,
                uploaded_at TIMESTAMPTZ DEFAULT NOW(),
                last_accessed TIMESTAMPTZ,
                access_count INTEGER DEFAULT 0
            )
        """)
        
        # Insert requirement
        cursor.execute("""
            INSERT INTO requirements_index (filename, category, content, file_path)
            VALUES (%s, %s, %s, %s)
        """, (filename, category, content, file_path))
        
        conn.commit()
        cursor.close()
        conn.close()
    
    def search_requirements(self, query: str, category: Optional[str] = None) -> List[Dict]:
        """
        Search requirements by content
        
        Args:
            query: Search query
            category: Optional category filter
        
        Returns:
            List of matching requirements
        """
        import psycopg2
        
        conn = psycopg2.connect(
            host="170.64.228.171",
            port=3000,
            database="postgres",
            user="default",
            password=os.getenv("POSTGRES_PASSWORD")
        )
        
        cursor = conn.cursor()
        
        if category:
            cursor.execute("""
                SELECT filename, category, content, file_path, uploaded_at
                FROM requirements_index
                WHERE category = %s AND content ILIKE %s
                ORDER BY uploaded_at DESC
            """, (category, f"%{query}%"))
        else:
            cursor.execute("""
                SELECT filename, category, content, file_path, uploaded_at
                FROM requirements_index
                WHERE content ILIKE %s
                ORDER BY uploaded_at DESC
            """, (f"%{query}%",))
        
        results = []
        for row in cursor.fetchall():
            results.append({
                'filename': row[0],
                'category': row[1],
                'content_preview': row[2][:500],  # First 500 chars
                'file_path': row[3],
                'uploaded_at': row[4]
            })
        
        cursor.close()
        conn.close()
        
        return results
    
    def get_requirement(self, filename: str, category: str) -> Optional[str]:
        """Get full content of a specific requirement"""
        file_path = self.requirements_dir / category / filename
        
        if not file_path.exists():
            return None
        
        # Try to read extracted markdown first
        md_path = file_path.with_suffix('.extracted.md')
        if md_path.exists():
            with open(md_path, 'r', encoding='utf-8') as f:
                return f.read()
        
        # Fall back to processing the original file
        if file_path.suffix == '.md':
            return self._extract_markdown(file_path)
        elif file_path.suffix == '.docx':
            return self._extract_docx(file_path)
        elif file_path.suffix == '.pdf':
            return self._extract_pdf(file_path)
        elif file_path.suffix == '.txt':
            return self._extract_text(file_path)
        
        return None
```

---

### 2. Command Agent Integration

```python
# src/agent.py (additions)

class CommandAgent:
    def __init__(self):
        self.mcp_registry = MCPRegistry()
        self.requirements_processor = RequirementsProcessor()  # NEW
        
    def process_command(self, command: str, context: Dict = None):
        """Process natural language command"""
        
        # Check if this is an upload command
        if "upload" in command.lower() or "requirements" in command.lower():
            return self._handle_requirements_upload(command, context)
        
        # Check if command references existing requirements
        relevant_requirements = self._find_relevant_requirements(command)
        
        if relevant_requirements:
            # Enhance context with requirements
            context = context or {}
            context['requirements'] = relevant_requirements
        
        # Continue with normal processing...
        return self._execute_command(command, context)
    
    def _handle_requirements_upload(self, command: str, context: Dict):
        """Handle requirements upload commands"""
        
        # Extract file path from command or context
        file_path = context.get('file_path') or self._extract_file_path(command)
        category = context.get('category', 'projects')
        
        if not file_path:
            return {
                'success': False,
                'message': "Please provide a file path. Usage: upload_requirements('path/to/file.docx', category='agents')"
            }
        
        try:
            result = self.requirements_processor.upload_file(file_path, category)
            
            return {
                'success': True,
                'message': f"✅ Requirements uploaded: {result['filename']}",
                'details': result
            }
        except Exception as e:
            return {
                'success': False,
                'message': f"❌ Upload failed: {str(e)}"
            }
    
    def _find_relevant_requirements(self, command: str) -> List[str]:
        """Find requirements relevant to the command"""
        
        # Extract key terms from command
        key_terms = self._extract_key_terms(command)
        
        relevant = []
        for term in key_terms:
            results = self.requirements_processor.search_requirements(term)
            relevant.extend(results)
        
        # Deduplicate
        seen = set()
        unique = []
        for req in relevant:
            if req['filename'] not in seen:
                seen.add(req['filename'])
                unique.append(req)
        
        return unique[:5]  # Top 5 most relevant
```

---

### 3. CLI Interface

```bash
# Command line usage

# Upload agent requirements
python command_agent.py upload \
  --file "PPA_Requirements_v2.0.docx" \
  --category "agents"

# Upload project requirements
python command_agent.py upload \
  --file "digital-sentinel-spec.md" \
  --category "projects"

# Upload website copy
python command_agent.py upload \
  --file "Almost_Magic_Website_Copy.docx" \
  --category "website-copy"

# Build from requirements
python command_agent.py build \
  --from-requirements "PPA_Requirements_v2.0.docx"

# Search requirements
python command_agent.py search-requirements \
  --query "email integration" \
  --category "agents"
```

---

### 4. Interactive Mode

```python
# Interactive Python session

from command_agent import CommandAgent

agent = CommandAgent()

# Upload requirements
result = agent.upload_requirements(
    file_path="~/Documents/PPA_Requirements_v2.0.docx",
    category="agents"
)
print(result)

# Build from uploaded requirements
agent.build_from_requirements(
    filename="PPA_Requirements_v2.0.docx",
    category="agents"
)

# Search for specific requirements
results = agent.search_requirements(
    query="calendar integration",
    category="agents"
)

for req in results:
    print(f"Found in: {req['filename']}")
    print(f"Preview: {req['content_preview']}")
```

---

## 🎯 USE CASES

### Use Case 1: Building Agent from Detailed Spec

**Before:**
```
User: "Build PPA with task management, calendar, email..."
[Types 50 messages explaining features]
```

**After:**
```bash
# Upload once
python command_agent.py upload \
  --file "PPA_Requirements_v2.0.docx" \
  --category "agents"

# Build anytime
python command_agent.py build \
  --from-requirements "PPA_Requirements_v2.0.docx"
```

---

### Use Case 2: Building Website from Copy Doc

**Before:**
```
User: "Make a landing page with..."
[Explains entire website structure]
```

**After:**
```bash
# Upload website copy
python command_agent.py upload \
  --file "Almost_Magic_Website_Copy.docx" \
  --category "website-copy"

# Build website
python command_agent.py build-website \
  --from-requirements "Almost_Magic_Website_Copy.docx"

# Command Agent reads copy and creates full website!
```

---

### Use Case 3: ByteBot Integration

```
User (to ByteBot): "Upload this requirements doc to Command Agent"
→ ByteBot reads doc
→ ByteBot calls Command Agent API
→ Requirements uploaded automatically
→ User: "Now build PPA"
→ ByteBot tells Command Agent to build from requirements
→ Done!
```

---

## 📊 DATABASE SCHEMA

```sql
-- Requirements index table
CREATE TABLE requirements_index (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    file_path TEXT NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),
    last_accessed TIMESTAMPTZ,
    access_count INTEGER DEFAULT 0,
    metadata JSONB,  -- Additional metadata (author, version, etc.)
    checksum VARCHAR(64)  -- File checksum for change detection
);

-- Full-text search index
CREATE INDEX idx_requirements_content ON requirements_index USING GIN(to_tsvector('english', content));

-- Category index
CREATE INDEX idx_requirements_category ON requirements_index(category);

-- Upload history
CREATE TABLE requirements_history (
    id SERIAL PRIMARY KEY,
    requirement_id INTEGER REFERENCES requirements_index(id),
    action VARCHAR(50),  -- 'uploaded', 'accessed', 'built_from'
    performed_at TIMESTAMPTZ DEFAULT NOW(),
    performed_by VARCHAR(100),
    details JSONB
);
```

---

## 🚀 IMPLEMENTATION ROADMAP

### Phase 1: Basic Upload (Week 1)
- [ ] File upload handler
- [ ] Support .md, .docx, .pdf, .txt
- [ ] Database indexing
- [ ] CLI interface

### Phase 2: Smart Processing (Week 2)
- [ ] Content extraction and parsing
- [ ] Automatic categorization
- [ ] Search functionality
- [ ] Integration with Command Agent

### Phase 3: Advanced Features (Week 3)
- [ ] Website building from copy docs
- [ ] Template system
- [ ] Version control for requirements
- [ ] ByteBot integration

### Phase 4: Intelligence (Week 4)
- [ ] Automatic feature extraction
- [ ] Requirement validation
- [ ] Conflict detection
- [ ] Suggestion system

---

## 💰 VALUE PROPOSITION

### Time Savings:
- **Before:** 2-3 hours explaining requirements per project
- **After:** 5 minutes uploading document
- **Savings:** 2+ hours per project

### Quality Improvements:
- **Before:** Details lost in conversation
- **After:** Complete spec always available
- **Result:** Better, more accurate builds

### Reusability:
- **Before:** Re-explain every time
- **After:** Upload once, use forever
- **Result:** Instant project starts

---

## ✅ SUCCESS METRICS

The feature is successful when:

1. ✅ User can upload any requirements document
2. ✅ Command Agent reads and understands it
3. ✅ Builds match requirements exactly
4. ✅ 90%+ reduction in explanation time
5. ✅ Zero requirements lost in conversation
6. ✅ Requirements reusable across projects

---

## 🎉 CONCLUSION

**This feature transforms Command Agent from a chat interface to a professional development platform.**

**Key Benefits:**
1. Professional requirements management
2. Single source of truth
3. Reusable specifications
4. ByteBot integration ready
5. Website building capability
6. Zero learning curve (just upload!)

**This is how you build enterprise-grade software as a solo founder.** 🚀

---

**Ready to implement? This goes into Command Agent v2 specifications!**
