
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => renderJobListings(data))
      .catch(error => console.error('Error fetching data:', error));
  });
  
  function renderJobListings(jobListings) {
    const listingsContainer = document.getElementById('job-listings');
  
    jobListings.forEach(job => {
      const jobElement = document.createElement('div');
      jobElement.className = 'job-listing';
  
      const jobHeader = document.createElement('div');
      jobHeader.className = 'job-header';
  
      const companyElement = document.createElement('span');
      companyElement.className = 'company';
      companyElement.textContent = job.company;
  
      const newFeaturedElement = document.createElement('span');
      newFeaturedElement.className = 'new-featured';
      if (job.new) {
        const newElement = document.createElement('span');
        newElement.className = 'new';
        newElement.textContent = 'New!';
        newFeaturedElement.appendChild(newElement);
      }
      if (job.featured) {
        const featuredElement = document.createElement('span');
        featuredElement.className = 'featured';
        featuredElement.textContent = 'Featured';
        newFeaturedElement.appendChild(featuredElement);
      }
  
      jobHeader.appendChild(companyElement);
      jobHeader.appendChild(newFeaturedElement);
      jobElement.appendChild(jobHeader);
  
      const jobTitle = document.createElement('div');
      jobTitle.className = 'job-title';
      jobTitle.textContent = job.position;
      jobElement.appendChild(jobTitle);
  
      const jobMeta = document.createElement('div');
      jobMeta.className = 'job-meta';
      jobMeta.innerHTML = `<span>${job.postedAt}</span><span>• ${job.contract}</span><span>• ${job.location}</span>`;
      jobElement.appendChild(jobMeta);
  
      const jobTags = document.createElement('div');
      jobTags.className = 'job-tags';
  
      job.languages.forEach(language => {
        const tagElement = document.createElement('span');
        tagElement.textContent = language;
        jobTags.appendChild(tagElement);
      });
  
      job.tools.forEach(tool => {
        const tagElement = document.createElement('span');
        tagElement.textContent = tool;
        jobTags.appendChild(tagElement);
      });
  
      jobElement.appendChild(jobTags);
      listingsContainer.appendChild(jobElement);
    });
  }
  