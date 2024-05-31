// script.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        renderJobListings(data);
        addFilterListeners(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  
  function renderJobListings(jobListings, filters = []) {
    const listingsContainer = document.getElementById('job-listings');
    listingsContainer.innerHTML = ''; // Clear previous listings
  
    jobListings.forEach(job => {
      if (filters.length > 0 && !filters.some(filter => job.languages.includes(filter) || job.tools.includes(filter) || job.role.includes(filter))) {
        return; // Skip job if it doesn't match any of the filters
      }
  
      const jobElement = document.createElement('div');
      jobElement.className = 'job-listing';
  
      // Job Header with Logo, Company, New and Featured
      const jobHeader = document.createElement('div');
      jobHeader.className = 'job-header';
  
      const companyLogo = document.createElement('img');
      companyLogo.className = 'company-logo';
      companyLogo.src = job.logo;
      companyLogo.alt = job.company;
  
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
  
      jobHeader.appendChild(companyLogo);
      jobHeader.appendChild(companyElement);
      jobHeader.appendChild(newFeaturedElement);
      jobElement.appendChild(jobHeader);
  
      // Job Title and Tags
      const jobTitleContainer = document.createElement('div');
      jobTitleContainer.className = 'job-title-container';
  
      const jobTitle = document.createElement('div');
      jobTitle.className = 'job-title';
      jobTitle.textContent = job.position;
      jobTitleContainer.appendChild(jobTitle);
  
      const jobTags = document.createElement('div');
      jobTags.className = 'job-tags';
      job.languages.concat(job.tools).forEach(skill => {
        const tagElement = document.createElement('span');
        tagElement.textContent = skill;
        jobTags.appendChild(tagElement);
      });
  
      jobTitleContainer.appendChild(jobTags);
      jobElement.appendChild(jobTitleContainer);
  
      // Job Metadata
      const jobMeta = document.createElement('div');
      jobMeta.className = 'job-meta';
      jobMeta.innerHTML = `<span>${job.postedAt}</span><span>• ${job.contract}</span><span>• ${job.location}</span>`;
      jobElement.appendChild(jobMeta);
  
      listingsContainer.appendChild(jobElement);
    });
  }
  
  function addFilterListeners(data) {
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const clearButton = document.querySelector('.clear-btn');
  
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        button.classList.toggle('active');
  
        const activeFilters = Array.from(document.querySelectorAll('.filter-buttons button.active')).map(btn => btn.getAttribute('data-filter'));
        renderJobListings(data, activeFilters);
      });
    });
  
    clearButton.addEventListener('click', () => {
      document.querySelectorAll('.filter-buttons button').forEach(button => button.classList.remove('active'));
      renderJobListings(data);
    });
  }
  